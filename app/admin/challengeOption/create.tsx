import {
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { correctChoices } from './list';

type Props = {};

export const ChallengeOptionCreate = (props: Props) => {
  return (
    <Create>
      <SimpleForm>
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
    </Create>
  );
};
