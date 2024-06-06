import {
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
  Edit,
} from 'react-admin';

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" label="Id" validate={[required()]} />
        <TextInput source="title" label="Title" validate={[required()]} />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};
