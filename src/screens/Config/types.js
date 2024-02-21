import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import {
  DetailItemComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import Utils from "lib/utils";
import { addRow, getLocalSheetData } from "services/configSpreadsheet";
import EmptyBox from "rsc/img/emptybox.png";
import { sheetHeadersTypes } from "config/sheet";

const defaultForm = {
  name: "",
  icon: "",
};

const Types = ({ doc, setMainLoading, isLoading, deleteRecord }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [types, seTypes] = useState(null);

  const getStartData = useCallback(async () => {
    const data = await getLocalSheetData(
      doc,
      Utils.Constants.TYPES,
      sheetHeadersTypes
    );
    seTypes(data);
  }, [doc]);

  useEffect(() => {
    if (doc && !isLoading) {
      getStartData();
    }
  }, [doc, getStartData, isLoading]);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const hideForm = () => {
    setShowForm(false);
  };

  const onChange = (name, value) => {
    if (name && value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addType = async () => {
    setMainLoading(true);
    try {
      const { name, icon } = form;
      const data = { name, icon };
      await addRow(doc, Utils.Constants.TYPES, sheetHeadersTypes, data);
      setForm(defaultForm);
      getStartData();
      hideForm();
    } catch (error) {
      console.log("ERROR (addType)", error);
    } finally {
      setMainLoading(false);
    }
  };

  if (showForm) {
    return (
      <S.Content>
        <S.Form>
          <InputComponent
            type="text"
            placeholder="Type name"
            name="name"
            value={form.name}
            onChange={onChange}
            title="Name"
          />
          <InputComponent
            type="icon"
            placeholder="Search icon"
            name="icon"
            value={form.icon}
            onChange={onChange}
            title="Icon"
          />
        </S.Form>
        <ButtonComponent text="Save" action={addType} />
        <ButtonComponent type="text" text="Cancel" action={hideForm} />
      </S.Content>
    );
  }

  const SkeletonLoading = (isLoading) => {
    return !isLoading ? (
      <S.NoData>
        <img src={EmptyBox} alt="Empty box" />
        <p className="strong">You have not created any type yet.</p>
        <p>You can easily create and manage your types on this page.</p>
      </S.NoData>
    ) : (
      <>
        <DetailItemComponent icon={true} deleteAction={true} isLoading={true} />
        <DetailItemComponent icon={true} deleteAction={true} isLoading={true} />
        <DetailItemComponent icon={true} deleteAction={true} isLoading={true} />
      </>
    );
  };

  return (
    <S.Content>
      <S.TableContainer>
        {types === null || types.length === 0
          ? SkeletonLoading(isLoading)
          : types.map(({ Name, Icon, Id }) => {
              return (
                <DetailItemComponent
                  key={`${Id}-${Name}`}
                  title={Name}
                  icon={Icon}
                  deleteAction={() =>
                    deleteRecord(Id, Utils.Constants.TYPES, sheetHeadersTypes)
                  }
                />
              );
            })}
      </S.TableContainer>
      <ButtonComponent
        text="Add new"
        action={handleAddNew}
        disabled={isLoading}
      />
    </S.Content>
  );
};

export default Types;
