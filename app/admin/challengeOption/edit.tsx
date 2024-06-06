import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { correctChoices } from './list';

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="Text" validate={[required()]} />
        <SelectInput
          source="correct"
          choices={correctChoices}
          validate={[required()]}
        />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="text" label="Text" validate={[required()]} />
        <TextInput source="imageSrc" label="Image" />
        <TextInput source="audioSrc" label="Audio" />
      </SimpleForm>
    </Edit>
  );
};
