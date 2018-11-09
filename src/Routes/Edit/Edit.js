import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Editor from '../../Components/Editor';
import { GET_NOTE } from '../../queries';

export const EDIT_NOTE = gql`
    mutation editNote($id: Int!, $title: String!, $content: String!) @client {
        editNote(id: $id, title: $title, content: $content) {
            id
        }
    }
`

export default class Edit extends React.Component {
    render() {
        const { match: { params: { id } } } = this.props;
        return (
            <Query query={GET_NOTE} variables={{ id }}>
                {
                    ({ data }) => data.note ? (
                        <Mutation mutation={EDIT_NOTE}>
                            {
                                editNote => {
                                    this.editNote = editNote;
                                    return (
                                        <Editor
                                            id={data.note.id}
                                            title={data.note.title}
                                            content={data.note.content}
                                            onSave={this._onSave} />
                                    )
                                }
                            }
                        </Mutation>
                    ) : null
                }
            </Query>
        );
    }

    _onSave = (title, content, id) => {
        const { history: { push } } = this.props;
        if (id && title !== '' && content !== '') {
            this.editNote({ variables: { id, title, content } });
            push('/');
        }
    }
}