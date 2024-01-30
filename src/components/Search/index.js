import React, { useContext, useEffect, useState, useCallback } from "react";
import * as S from "./styles";
import { GlobalContext, DispatchTypes } from "context";
import { SearchIcon, CloseIcon, DetailItemComponent } from "components";
import { getItemsByText } from "services";
import Utils from "lib/utils";
import EmptyBox from "rsc/img/emptybox.png";

const { dateToText } = Utils.Date;

const Search = () => {
  const context = useContext(GlobalContext);
  const [userState] = context.globalUser;
  const [searchValue, searchDispatch] = context.globalSearch;
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  const { doc, loading } = userState;

  const handleCloseSearch = (e) => {
    console.log("CLOSE!!");
    e.preventDefault();
    e.stopPropagation();
    searchDispatch({ type: DispatchTypes.Search.SEARCH_HIDE });
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCount(0);
    }
    searchDispatch({
      type: DispatchTypes.Search.SEARCH_INPUT,
      input: value,
    });
  };

  const getItems = async (doc, text) => {
    const items = await getItemsByText(doc, text);
    if (items) {
      setResults(items.results);
      setCount(items.count);
    }
  };

  useEffect(() => {
    if (doc) {
      getItems(doc, searchValue.input);
    }
  }, [doc, searchValue.input]);

  const searchInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const Result = () => {
    if (searchValue.input === "") {
      return <S.NoResultsMessage>Start typing for search</S.NoResultsMessage>;
    }

    if (results.length === 0) {
      return (
        <S.NoResultsMessage>
          <img src={EmptyBox} alt="Empty box" />

          <p>We could not find any matches.</p>
        </S.NoResultsMessage>
      );
    }

    return (
      <div>
        {results.map(({ Id, Amount, Date, Detail, Type }) => (
          <DetailItemComponent
            key={Id}
            amount={Amount}
            description={dateToText(Date)}
            title={Detail}
            subTitle={Type}
          />
        ))}
      </div>
    );
  };

  return (
    <S.Container onClick={handleCloseSearch}>
      <S.Content onClick={handleStopPropagation}>
        {!loading && (
          <S.SearchInputContainer>
            <SearchIcon />
            <S.SearchInput
              autofocus
              placeholder="Start searching..."
              onChange={handleSearchInput}
              value={searchValue.input}
              ref={searchInput}
            />
            <S.CloseContainer onClick={handleCloseSearch}>
              <CloseIcon />
            </S.CloseContainer>
          </S.SearchInputContainer>
        )}

        {count !== 0 && (
          <S.CountContainer>
            <div>
              <strong>Showing</strong>
              <p>{results.length}</p>
            </div>
            <div>
              <strong>Total</strong>
              <p>{count}</p>
            </div>
          </S.CountContainer>
        )}

        <S.SearchResult>
          <Result />
        </S.SearchResult>
      </S.Content>
    </S.Container>
  );
};
export default Search;
