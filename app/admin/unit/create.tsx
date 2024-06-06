import {
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

type Props = {};

export const UnitCreate = (props: Props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput
          source="description"
          label="Description"
          validate={[required()]}
        />
        <ReferenceInput source="courseId" reference="courses" />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
