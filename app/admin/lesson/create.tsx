import {
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

type Props = {};

export const LessonCreate = (props: Props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
