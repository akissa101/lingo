import {
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { choices } from './list';

type Props = {};

export const ChallengeCreate = (props: Props) => {
  return (
    <Create>
      <SimpleForm>
        <SelectInput source="type" choices={choices} validate={[required()]} />
        <ReferenceInput source="lessonId" reference="lessons" />
        <TextInput source="question" label="Question" validate={[required()]} />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
