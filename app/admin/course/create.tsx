import { Create, SimpleForm, TextInput, required } from 'react-admin';

type Props = {};

export const CourseCreate = (props: Props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput source="imageSrc" label="Image" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
