import {
  Datagrid,
  List,
  ReferenceField,
  SelectField,
  TextField,
} from 'react-admin';

export const correctChoices = [
  { id: 'True', name: 'True' },
  { id: 'False', name: 'False' },
];

export const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <SelectField source="correct" choices={correctChoices} />
        <TextField source="text" />
        <ReferenceField source="challengeId" reference="challenges" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};
