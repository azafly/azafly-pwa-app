module.exports = {
    schema: [
        {
            'https://azafly-staging.hasura.app/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': 'ajqk0EEQmMz1e7NOIAERaPIi7KoJw3VwEx2KhOfXMsVzug521TXuE2tDXMn66DVM',
                    Authorization: `Bearer ajqk0EEQmMz1e7NOIAERaPIi7KoJw3VwEx2KhOfXMsVzug521TXuE2tDXMn66DVM`
                }
            }
        }
    ],
    documents: ['src/api/**/*.tsx', 'src/api/**/*.ts'],
    overwrite: true,
    generates: {
        'src/api/generated/graphql.tsx': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
                immutableTypes: true
            }
        },
        './graphql.schema.json': {
            plugins: ['introspection']
        }
    }
};
