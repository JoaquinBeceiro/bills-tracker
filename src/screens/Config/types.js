import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styles";
import {
  DetailItemComponent,
  ButtonComponent,
  InputComponent,
} from "components";
import Utils from "lib/utils";
import {
  addRow,
  deleteRow,
  getLocalSheetData,
} from "services/configSpreadsheet";
import EmptyBox from "rsc/img/emptybox.png";

const { formatMoney, moneyToNumber } = Utils.Currency;

const defaultForm = {
  name: "",
  description: "",
};

const Types = ({
  doc,
  setMainLoading,
  DispatchTypes,
  modalDispatch,
  isLoading,
  billsTypes,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [types, seTypes] = useState(null);

  const getStartData = useCallback(async () => {
    const data = await getLocalSheetData(doc);
    // setSchedules(data);
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
      const { name, description } = form;
      await addRow(doc, name, description);
      setForm(defaultForm);
      getStartData();
      hideForm();
    } catch (error) {
      console.log("ERROR (addSchedule)", error);
    } finally {
      setMainLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title: "Confirmation",
      content: "Do you really want to delete this record?",
      actions: [
        {
          type: "secondary",
          text: "Delete",
          action: async () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
            setMainLoading(true);
            await deleteRow(doc, id);
            getStartData();
            setMainLoading(false);
          },
        },
        {
          type: "text",
          text: "Cancel",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
          },
        },
      ],
    });
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
            type="bigtext"
            name="description"
            title="Description"
            placeholder="Write a description..."
            value={form.description}
            onChange={onChange}
          />
        </S.Form>
        {/* <ButtonComponent text="Save" action={addSchedule} /> */}
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
        <DetailItemComponent deleteAction={true} isLoading={true} />
        <DetailItemComponent deleteAction={true} isLoading={true} />
        <DetailItemComponent deleteAction={true} isLoading={true} />
      </>
    );
  };

  return (
    <S.Content>
      <S.TableContainer>
        {types === null || types.length === 0
          ? SkeletonLoading(isLoading)
          : types.map(({ Name, Type, Amount, Frequency, Description, Id }) => {
              const priceFormatted = `$${formatMoney(moneyToNumber(Amount))}`;
              const typeSchedule = Utils.Constants.SCHEDULE_FREQUENCY.find(
                ({ key }) => key === Frequency
              ).value;
              return (
                <DetailItemComponent
                  key={`${Id}-${Name}`}
                  amount={priceFormatted}
                  title={`${Name} (${typeSchedule})`}
                  subTitle={Type}
                  description={Description}
                  deleteAction={() => deleteRecord(Id)}
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
