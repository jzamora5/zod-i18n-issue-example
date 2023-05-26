import { NameSpaces } from "@/types/nameSpaces";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "../components/controlledInput";
import { schema } from "./schema";
import { makeZodI18nMap } from "zod-i18n-map";
import { z } from "zod";
import { I18nNamespaces } from "../types/i18next";

interface FormValues {
  personName: string;
  contactMethod: Array<{ method: string }>;
}

export const getServerSideProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations("en")),
    },
  };
};

export default function Home() {
  const { t } = useTranslation<(keyof I18nNamespaces)[]>();
  z.setErrorMap(makeZodI18nMap({ t }));

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "contactMethod",
    control,
  });

  const onSubmit = () => {
    console.log("FormValues", getValues());
  };

  const handleContactMethodAdd = () => {
    append({ method: "" });
  };

  const handleContactMethodDelete = (index: number) => {
    remove(index);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <form className="bg-sky-200 p-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-5">{t("appTitle", { ns: NameSpaces.COMMON })}</h1>
        <div className="">
          <div className="border border-green-700 p-3">
            <header>
              <h2 className="font-bold">Fixed Input</h2>
            </header>
            <p>Person Name</p>
            <ControlledInput control={control} name="personName" />
            <p className="text-red-600">{errors?.personName?.message}</p>
          </div>
        </div>

        <div className="mt-4 border border-green-700 p-3">
          <header>
            <h2 className="font-bold">Dynamic Multiple Inputs</h2>
            <div className="flex items-center mt-3">
              <h3>Contact Method</h3>
              <button
                className="ml-2 bg-green-600 p-2 text-white rounded-lg"
                onClick={handleContactMethodAdd}
              >
                Add +
              </button>
            </div>
          </header>
          {fields.map((field, index) => {
            return (
              <div key={index} className="mt-2">
                <p>Contact Method {index + 1}</p>
                <ControlledInput
                  control={control}
                  name={`contactMethod.${index}.method`}
                  key={field.id}
                />

                <button
                  className="ml-2 bg-red-800 p-2 text-white rounded-lg"
                  onClick={() => handleContactMethodDelete(index)}
                >
                  Delete -
                </button>

                <p className="text-red-600">
                  {errors?.contactMethod?.[index]?.method?.message}
                </p>
              </div>
            );
          })}
        </div>
        <button
          className="mt-4 bg-slate-400 p-2 text-white rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
