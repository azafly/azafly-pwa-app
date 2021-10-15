module.exports = {
    schema: [
        {
            'https://azafly-staging.hasura.app/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': 'hZzl7Bg6sHb87i6r4HQlMUT8ScBy37UjF9w1ojlfvmWBEcGuNkj4SjTW7TUiAth6',
                    Authorization: `Bearer hZzl7Bg6sHb87i6r4HQlMUT8ScBy37UjF9w1ojlfvmWBEcGuNkj4SjTW7TUiAth6`
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
