import { gql } from '@apollo/client';

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        currentTargetCountry: Country!
        currentSourceCountry: Country!
        canGoToNextStep: Boolean!
    }
`;

export const CAN_MOVE_TO_NEXT_STEP = gql`
    query canUserMoveToNextSteps {
        canGoToNextStep @client
    }
`;
