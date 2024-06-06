import {
  Datagrid,
  List,
  ReferenceField,
  SelectField,
  TextField,
} from 'react-admin';

export const choices = [
  { id: 'SELECT', name: 'SELECT' },
  { id: 'ASSIST', name: 'ASSIST' },
];

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <SelectField source="type" choices={choices} />
        <TextField source="question" />
        <ReferenceField source="lessonId" reference="lessons" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};
