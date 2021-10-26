import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bpchar: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['Boolean']>;
  readonly _gt?: Maybe<Scalars['Boolean']>;
  readonly _gte?: Maybe<Scalars['Boolean']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['Boolean']>;
  readonly _lte?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Scalars['Boolean']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['Int']>;
  readonly _gt?: Maybe<Scalars['Int']>;
  readonly _gte?: Maybe<Scalars['Int']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['Int']>;
  readonly _lte?: Maybe<Scalars['Int']>;
  readonly _neq?: Maybe<Scalars['Int']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['Int']>>;
};

export type SampleInput = {
  readonly password: Scalars['String'];
  readonly username: Scalars['String'];
};

export type SampleOutput = {
  readonly __typename?: 'SampleOutput';
  readonly accessToken: Scalars['String'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['String']>;
  readonly _gt?: Maybe<Scalars['String']>;
  readonly _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  readonly _ilike?: Maybe<Scalars['String']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  readonly _iregex?: Maybe<Scalars['String']>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  readonly _like?: Maybe<Scalars['String']>;
  readonly _lt?: Maybe<Scalars['String']>;
  readonly _lte?: Maybe<Scalars['String']>;
  readonly _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  readonly _nilike?: Maybe<Scalars['String']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  readonly _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  readonly _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  readonly _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  readonly _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  readonly _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  readonly _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "accounts" */
export type Accounts = {
  readonly __typename?: 'accounts';
  readonly access_token?: Maybe<Scalars['String']>;
  readonly access_token_expires?: Maybe<Scalars['timestamptz']>;
  readonly compound_id: Scalars['String'];
  readonly created_at: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  readonly provider_account_id: Scalars['String'];
  readonly provider_id: Scalars['String'];
  readonly provider_type: Scalars['String'];
  readonly refresh_token?: Maybe<Scalars['String']>;
  readonly updated_at: Scalars['timestamptz'];
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  readonly __typename?: 'accounts_aggregate';
  readonly aggregate?: Maybe<Accounts_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  readonly __typename?: 'accounts_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Accounts_Max_Fields>;
  readonly min?: Maybe<Accounts_Min_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "accounts" */
export type Accounts_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Accounts_Max_Order_By>;
  readonly min?: Maybe<Accounts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "accounts" */
export type Accounts_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Accounts_Insert_Input>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Accounts_Bool_Exp>>;
  readonly _not?: Maybe<Accounts_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Accounts_Bool_Exp>>;
  readonly access_token?: Maybe<String_Comparison_Exp>;
  readonly access_token_expires?: Maybe<Timestamptz_Comparison_Exp>;
  readonly compound_id?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly provider_account_id?: Maybe<String_Comparison_Exp>;
  readonly provider_id?: Maybe<String_Comparison_Exp>;
  readonly provider_type?: Maybe<String_Comparison_Exp>;
  readonly refresh_token?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
  readonly access_token?: Maybe<Scalars['String']>;
  readonly access_token_expires?: Maybe<Scalars['timestamptz']>;
  readonly compound_id?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly provider_account_id?: Maybe<Scalars['String']>;
  readonly provider_id?: Maybe<Scalars['String']>;
  readonly provider_type?: Maybe<Scalars['String']>;
  readonly refresh_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  readonly __typename?: 'accounts_max_fields';
  readonly access_token?: Maybe<Scalars['String']>;
  readonly access_token_expires?: Maybe<Scalars['timestamptz']>;
  readonly compound_id?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly provider_account_id?: Maybe<Scalars['String']>;
  readonly provider_id?: Maybe<Scalars['String']>;
  readonly provider_type?: Maybe<Scalars['String']>;
  readonly refresh_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "accounts" */
export type Accounts_Max_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly access_token_expires?: Maybe<Order_By>;
  readonly compound_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly provider_account_id?: Maybe<Order_By>;
  readonly provider_id?: Maybe<Order_By>;
  readonly provider_type?: Maybe<Order_By>;
  readonly refresh_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  readonly __typename?: 'accounts_min_fields';
  readonly access_token?: Maybe<Scalars['String']>;
  readonly access_token_expires?: Maybe<Scalars['timestamptz']>;
  readonly compound_id?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly provider_account_id?: Maybe<Scalars['String']>;
  readonly provider_id?: Maybe<Scalars['String']>;
  readonly provider_type?: Maybe<Scalars['String']>;
  readonly refresh_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "accounts" */
export type Accounts_Min_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly access_token_expires?: Maybe<Order_By>;
  readonly compound_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly provider_account_id?: Maybe<Order_By>;
  readonly provider_id?: Maybe<Order_By>;
  readonly provider_type?: Maybe<Order_By>;
  readonly refresh_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
  readonly __typename?: 'accounts_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Accounts>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly access_token_expires?: Maybe<Order_By>;
  readonly compound_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly provider_account_id?: Maybe<Order_By>;
  readonly provider_id?: Maybe<Order_By>;
  readonly provider_type?: Maybe<Order_By>;
  readonly refresh_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  AccessTokenExpires = 'access_token_expires',
  /** column name */
  CompoundId = 'compound_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderAccountId = 'provider_account_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ProviderType = 'provider_type',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
  readonly access_token?: Maybe<Scalars['String']>;
  readonly access_token_expires?: Maybe<Scalars['timestamptz']>;
  readonly compound_id?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly provider_account_id?: Maybe<Scalars['String']>;
  readonly provider_id?: Maybe<Scalars['String']>;
  readonly provider_type?: Maybe<Scalars['String']>;
  readonly refresh_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};


/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type Bpchar_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['bpchar']>;
  readonly _gt?: Maybe<Scalars['bpchar']>;
  readonly _gte?: Maybe<Scalars['bpchar']>;
  /** does the column match the given case-insensitive pattern */
  readonly _ilike?: Maybe<Scalars['bpchar']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['bpchar']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  readonly _iregex?: Maybe<Scalars['bpchar']>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  readonly _like?: Maybe<Scalars['bpchar']>;
  readonly _lt?: Maybe<Scalars['bpchar']>;
  readonly _lte?: Maybe<Scalars['bpchar']>;
  readonly _neq?: Maybe<Scalars['bpchar']>;
  /** does the column NOT match the given case-insensitive pattern */
  readonly _nilike?: Maybe<Scalars['bpchar']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['bpchar']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  readonly _niregex?: Maybe<Scalars['bpchar']>;
  /** does the column NOT match the given pattern */
  readonly _nlike?: Maybe<Scalars['bpchar']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  readonly _nregex?: Maybe<Scalars['bpchar']>;
  /** does the column NOT match the given SQL regular expression */
  readonly _nsimilar?: Maybe<Scalars['bpchar']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  readonly _regex?: Maybe<Scalars['bpchar']>;
  /** does the column match the given SQL regular expression */
  readonly _similar?: Maybe<Scalars['bpchar']>;
};

/** columns and relationships of "cities" */
export type Cities = {
  readonly __typename?: 'cities';
  readonly active: Scalars['Boolean'];
  readonly city_id: Scalars['Int'];
  /** An object relationship */
  readonly country?: Maybe<Countries>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly name?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly state?: Maybe<States>;
  readonly state_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "cities" */
export type Cities_Aggregate = {
  readonly __typename?: 'cities_aggregate';
  readonly aggregate?: Maybe<Cities_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Cities>;
};

/** aggregate fields of "cities" */
export type Cities_Aggregate_Fields = {
  readonly __typename?: 'cities_aggregate_fields';
  readonly avg?: Maybe<Cities_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Cities_Max_Fields>;
  readonly min?: Maybe<Cities_Min_Fields>;
  readonly stddev?: Maybe<Cities_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Cities_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Cities_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Cities_Sum_Fields>;
  readonly var_pop?: Maybe<Cities_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Cities_Var_Samp_Fields>;
  readonly variance?: Maybe<Cities_Variance_Fields>;
};


/** aggregate fields of "cities" */
export type Cities_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "cities" */
export type Cities_Aggregate_Order_By = {
  readonly avg?: Maybe<Cities_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Cities_Max_Order_By>;
  readonly min?: Maybe<Cities_Min_Order_By>;
  readonly stddev?: Maybe<Cities_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Cities_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Cities_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Cities_Sum_Order_By>;
  readonly var_pop?: Maybe<Cities_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Cities_Var_Samp_Order_By>;
  readonly variance?: Maybe<Cities_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "cities" */
export type Cities_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Cities_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Cities_On_Conflict>;
};

/** aggregate avg on columns */
export type Cities_Avg_Fields = {
  readonly __typename?: 'cities_avg_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "cities" */
export type Cities_Avg_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "cities". All fields are combined with a logical 'AND'. */
export type Cities_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Cities_Bool_Exp>>;
  readonly _not?: Maybe<Cities_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Cities_Bool_Exp>>;
  readonly active?: Maybe<Boolean_Comparison_Exp>;
  readonly city_id?: Maybe<Int_Comparison_Exp>;
  readonly country?: Maybe<Countries_Bool_Exp>;
  readonly country_id?: Maybe<Uuid_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly state?: Maybe<States_Bool_Exp>;
  readonly state_id?: Maybe<Uuid_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "cities" */
export enum Cities_Constraint {
  /** unique or primary key constraint */
  CitiesPkey = 'cities_pkey'
}

/** input type for incrementing numeric columns in table "cities" */
export type Cities_Inc_Input = {
  readonly city_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "cities" */
export type Cities_Insert_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly city_id?: Maybe<Scalars['Int']>;
  readonly country?: Maybe<Countries_Obj_Rel_Insert_Input>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly state?: Maybe<States_Obj_Rel_Insert_Input>;
  readonly state_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Cities_Max_Fields = {
  readonly __typename?: 'cities_max_fields';
  readonly city_id?: Maybe<Scalars['Int']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly state_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "cities" */
export type Cities_Max_Order_By = {
  readonly city_id?: Maybe<Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly state_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Cities_Min_Fields = {
  readonly __typename?: 'cities_min_fields';
  readonly city_id?: Maybe<Scalars['Int']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly state_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "cities" */
export type Cities_Min_Order_By = {
  readonly city_id?: Maybe<Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly state_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "cities" */
export type Cities_Mutation_Response = {
  readonly __typename?: 'cities_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Cities>;
};

/** on conflict condition type for table "cities" */
export type Cities_On_Conflict = {
  readonly constraint: Cities_Constraint;
  readonly update_columns?: ReadonlyArray<Cities_Update_Column>;
  readonly where?: Maybe<Cities_Bool_Exp>;
};

/** Ordering options when selecting data from "cities". */
export type Cities_Order_By = {
  readonly active?: Maybe<Order_By>;
  readonly city_id?: Maybe<Order_By>;
  readonly country?: Maybe<Countries_Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly state?: Maybe<States_Order_By>;
  readonly state_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: cities */
export type Cities_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "cities" */
export enum Cities_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CityId = 'city_id',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StateId = 'state_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "cities" */
export type Cities_Set_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly city_id?: Maybe<Scalars['Int']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly state_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Cities_Stddev_Fields = {
  readonly __typename?: 'cities_stddev_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "cities" */
export type Cities_Stddev_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Cities_Stddev_Pop_Fields = {
  readonly __typename?: 'cities_stddev_pop_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "cities" */
export type Cities_Stddev_Pop_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Cities_Stddev_Samp_Fields = {
  readonly __typename?: 'cities_stddev_samp_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "cities" */
export type Cities_Stddev_Samp_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Cities_Sum_Fields = {
  readonly __typename?: 'cities_sum_fields';
  readonly city_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "cities" */
export type Cities_Sum_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** update columns of table "cities" */
export enum Cities_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CityId = 'city_id',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StateId = 'state_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Cities_Var_Pop_Fields = {
  readonly __typename?: 'cities_var_pop_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "cities" */
export type Cities_Var_Pop_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Cities_Var_Samp_Fields = {
  readonly __typename?: 'cities_var_samp_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "cities" */
export type Cities_Var_Samp_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Cities_Variance_Fields = {
  readonly __typename?: 'cities_variance_fields';
  readonly city_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "cities" */
export type Cities_Variance_Order_By = {
  readonly city_id?: Maybe<Order_By>;
};

/** columns and relationships of "countries" */
export type Countries = {
  readonly __typename?: 'countries';
  readonly active: Scalars['Boolean'];
  /** An array relationship */
  readonly cities: ReadonlyArray<Cities>;
  /** An aggregate relationship */
  readonly cities_aggregate: Cities_Aggregate;
  readonly code: Scalars['bpchar'];
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly phone_code?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly states: ReadonlyArray<States>;
  /** An array relationship */
  readonly statesByCountryId: ReadonlyArray<States>;
  /** An aggregate relationship */
  readonly statesByCountryId_aggregate: States_Aggregate;
  /** An aggregate relationship */
  readonly states_aggregate: States_Aggregate;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "countries" */
export type CountriesCitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


/** columns and relationships of "countries" */
export type CountriesCities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


/** columns and relationships of "countries" */
export type CountriesStatesArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


/** columns and relationships of "countries" */
export type CountriesStatesByCountryIdArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


/** columns and relationships of "countries" */
export type CountriesStatesByCountryId_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


/** columns and relationships of "countries" */
export type CountriesStates_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};

/** aggregated selection of "countries" */
export type Countries_Aggregate = {
  readonly __typename?: 'countries_aggregate';
  readonly aggregate?: Maybe<Countries_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Countries>;
};

/** aggregate fields of "countries" */
export type Countries_Aggregate_Fields = {
  readonly __typename?: 'countries_aggregate_fields';
  readonly avg?: Maybe<Countries_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Countries_Max_Fields>;
  readonly min?: Maybe<Countries_Min_Fields>;
  readonly stddev?: Maybe<Countries_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Countries_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Countries_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Countries_Sum_Fields>;
  readonly var_pop?: Maybe<Countries_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Countries_Var_Samp_Fields>;
  readonly variance?: Maybe<Countries_Variance_Fields>;
};


/** aggregate fields of "countries" */
export type Countries_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Countries_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Countries_Avg_Fields = {
  readonly __typename?: 'countries_avg_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "countries". All fields are combined with a logical 'AND'. */
export type Countries_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Countries_Bool_Exp>>;
  readonly _not?: Maybe<Countries_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Countries_Bool_Exp>>;
  readonly active?: Maybe<Boolean_Comparison_Exp>;
  readonly cities?: Maybe<Cities_Bool_Exp>;
  readonly code?: Maybe<Bpchar_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly latitude?: Maybe<Numeric_Comparison_Exp>;
  readonly longitude?: Maybe<Numeric_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly phone_code?: Maybe<String_Comparison_Exp>;
  readonly states?: Maybe<States_Bool_Exp>;
  readonly statesByCountryId?: Maybe<States_Bool_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "countries" */
export enum Countries_Constraint {
  /** unique or primary key constraint */
  CountriesPkey = 'countries_pkey',
  /** unique or primary key constraint */
  UidxCountriesCode = 'uidx_countries_code'
}

/** input type for incrementing numeric columns in table "countries" */
export type Countries_Inc_Input = {
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "countries" */
export type Countries_Insert_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly cities?: Maybe<Cities_Arr_Rel_Insert_Input>;
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly phone_code?: Maybe<Scalars['String']>;
  readonly states?: Maybe<States_Arr_Rel_Insert_Input>;
  readonly statesByCountryId?: Maybe<States_Arr_Rel_Insert_Input>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Countries_Max_Fields = {
  readonly __typename?: 'countries_max_fields';
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly phone_code?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Countries_Min_Fields = {
  readonly __typename?: 'countries_min_fields';
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly phone_code?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "countries" */
export type Countries_Mutation_Response = {
  readonly __typename?: 'countries_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Countries>;
};

/** input type for inserting object relation for remote table "countries" */
export type Countries_Obj_Rel_Insert_Input = {
  readonly data: Countries_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Countries_On_Conflict>;
};

/** on conflict condition type for table "countries" */
export type Countries_On_Conflict = {
  readonly constraint: Countries_Constraint;
  readonly update_columns?: ReadonlyArray<Countries_Update_Column>;
  readonly where?: Maybe<Countries_Bool_Exp>;
};

/** Ordering options when selecting data from "countries". */
export type Countries_Order_By = {
  readonly active?: Maybe<Order_By>;
  readonly cities_aggregate?: Maybe<Cities_Aggregate_Order_By>;
  readonly code?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly phone_code?: Maybe<Order_By>;
  readonly statesByCountryId_aggregate?: Maybe<States_Aggregate_Order_By>;
  readonly states_aggregate?: Maybe<States_Aggregate_Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: countries */
export type Countries_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "countries" */
export enum Countries_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneCode = 'phone_code',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "countries" */
export type Countries_Set_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly phone_code?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Countries_Stddev_Fields = {
  readonly __typename?: 'countries_stddev_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Countries_Stddev_Pop_Fields = {
  readonly __typename?: 'countries_stddev_pop_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Countries_Stddev_Samp_Fields = {
  readonly __typename?: 'countries_stddev_samp_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Countries_Sum_Fields = {
  readonly __typename?: 'countries_sum_fields';
  readonly latitude?: Maybe<Scalars['numeric']>;
  readonly longitude?: Maybe<Scalars['numeric']>;
};

/** update columns of table "countries" */
export enum Countries_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  PhoneCode = 'phone_code',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Countries_Var_Pop_Fields = {
  readonly __typename?: 'countries_var_pop_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Countries_Var_Samp_Fields = {
  readonly __typename?: 'countries_var_samp_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Countries_Variance_Fields = {
  readonly __typename?: 'countries_variance_fields';
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "currencies" */
export type Currencies = {
  readonly __typename?: 'currencies';
  readonly active: Scalars['Boolean'];
  readonly code: Scalars['String'];
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "currencies" */
export type Currencies_Aggregate = {
  readonly __typename?: 'currencies_aggregate';
  readonly aggregate?: Maybe<Currencies_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Currencies>;
};

/** aggregate fields of "currencies" */
export type Currencies_Aggregate_Fields = {
  readonly __typename?: 'currencies_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Currencies_Max_Fields>;
  readonly min?: Maybe<Currencies_Min_Fields>;
};


/** aggregate fields of "currencies" */
export type Currencies_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Currencies_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "currencies". All fields are combined with a logical 'AND'. */
export type Currencies_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Currencies_Bool_Exp>>;
  readonly _not?: Maybe<Currencies_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Currencies_Bool_Exp>>;
  readonly active?: Maybe<Boolean_Comparison_Exp>;
  readonly code?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly symbol?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "currencies" */
export enum Currencies_Constraint {
  /** unique or primary key constraint */
  CurrenciesPkey = 'currencies_pkey',
  /** unique or primary key constraint */
  UidxCurrenciesCode = 'uidx_currencies_code'
}

/** input type for inserting data into table "currencies" */
export type Currencies_Insert_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly code?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly symbol?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Currencies_Max_Fields = {
  readonly __typename?: 'currencies_max_fields';
  readonly code?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly symbol?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Currencies_Min_Fields = {
  readonly __typename?: 'currencies_min_fields';
  readonly code?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly symbol?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "currencies" */
export type Currencies_Mutation_Response = {
  readonly __typename?: 'currencies_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Currencies>;
};

/** on conflict condition type for table "currencies" */
export type Currencies_On_Conflict = {
  readonly constraint: Currencies_Constraint;
  readonly update_columns?: ReadonlyArray<Currencies_Update_Column>;
  readonly where?: Maybe<Currencies_Bool_Exp>;
};

/** Ordering options when selecting data from "currencies". */
export type Currencies_Order_By = {
  readonly active?: Maybe<Order_By>;
  readonly code?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly symbol?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: currencies */
export type Currencies_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "currencies" */
export enum Currencies_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "currencies" */
export type Currencies_Set_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly code?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly symbol?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** update columns of table "currencies" */
export enum Currencies_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  readonly __typename?: 'mutation_root';
  readonly actionName?: Maybe<SampleOutput>;
  /** delete data from the table: "accounts" */
  readonly delete_accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete data from the table: "cities" */
  readonly delete_cities?: Maybe<Cities_Mutation_Response>;
  /** delete single row from the table: "cities" */
  readonly delete_cities_by_pk?: Maybe<Cities>;
  /** delete data from the table: "countries" */
  readonly delete_countries?: Maybe<Countries_Mutation_Response>;
  /** delete single row from the table: "countries" */
  readonly delete_countries_by_pk?: Maybe<Countries>;
  /** delete data from the table: "currencies" */
  readonly delete_currencies?: Maybe<Currencies_Mutation_Response>;
  /** delete single row from the table: "currencies" */
  readonly delete_currencies_by_pk?: Maybe<Currencies>;
  /** delete data from the table: "payment_offer" */
  readonly delete_payment_offer?: Maybe<Payment_Offer_Mutation_Response>;
  /** delete single row from the table: "payment_offer" */
  readonly delete_payment_offer_by_pk?: Maybe<Payment_Offer>;
  /** delete data from the table: "payments" */
  readonly delete_payments?: Maybe<Payments_Mutation_Response>;
  /** delete single row from the table: "payments" */
  readonly delete_payments_by_pk?: Maybe<Payments>;
  /** delete data from the table: "payout" */
  readonly delete_payout?: Maybe<Payout_Mutation_Response>;
  /** delete single row from the table: "payout" */
  readonly delete_payout_by_pk?: Maybe<Payout>;
  /** delete data from the table: "service" */
  readonly delete_service?: Maybe<Service_Mutation_Response>;
  /** delete single row from the table: "service" */
  readonly delete_service_by_pk?: Maybe<Service>;
  /** delete data from the table: "service_type" */
  readonly delete_service_type?: Maybe<Service_Type_Mutation_Response>;
  /** delete single row from the table: "service_type" */
  readonly delete_service_type_by_pk?: Maybe<Service_Type>;
  /** delete data from the table: "sessions" */
  readonly delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  readonly delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "states" */
  readonly delete_states?: Maybe<States_Mutation_Response>;
  /** delete single row from the table: "states" */
  readonly delete_states_by_pk?: Maybe<States>;
  /** delete data from the table: "task" */
  readonly delete_task?: Maybe<Task_Mutation_Response>;
  /** delete single row from the table: "task" */
  readonly delete_task_by_pk?: Maybe<Task>;
  /** delete data from the table: "transaction" */
  readonly delete_transaction?: Maybe<Transaction_Mutation_Response>;
  /** delete single row from the table: "transaction" */
  readonly delete_transaction_by_pk?: Maybe<Transaction>;
  /** delete data from the table: "user_email_verification" */
  readonly delete_user_email_verification?: Maybe<User_Email_Verification_Mutation_Response>;
  /** delete single row from the table: "user_email_verification" */
  readonly delete_user_email_verification_by_pk?: Maybe<User_Email_Verification>;
  /** delete data from the table: "user_meta" */
  readonly delete_user_meta?: Maybe<User_Meta_Mutation_Response>;
  /** delete single row from the table: "user_meta" */
  readonly delete_user_meta_by_pk?: Maybe<User_Meta>;
  /** delete data from the table: "user_phones" */
  readonly delete_user_phones?: Maybe<User_Phones_Mutation_Response>;
  /** delete single row from the table: "user_phones" */
  readonly delete_user_phones_by_pk?: Maybe<User_Phones>;
  /** delete data from the table: "users" */
  readonly delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  readonly delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "verification_requests" */
  readonly delete_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** delete single row from the table: "verification_requests" */
  readonly delete_verification_requests_by_pk?: Maybe<Verification_Requests>;
  /** insert data into the table: "accounts" */
  readonly insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert a single row into the table: "accounts" */
  readonly insert_accounts_one?: Maybe<Accounts>;
  /** insert data into the table: "cities" */
  readonly insert_cities?: Maybe<Cities_Mutation_Response>;
  /** insert a single row into the table: "cities" */
  readonly insert_cities_one?: Maybe<Cities>;
  /** insert data into the table: "countries" */
  readonly insert_countries?: Maybe<Countries_Mutation_Response>;
  /** insert a single row into the table: "countries" */
  readonly insert_countries_one?: Maybe<Countries>;
  /** insert data into the table: "currencies" */
  readonly insert_currencies?: Maybe<Currencies_Mutation_Response>;
  /** insert a single row into the table: "currencies" */
  readonly insert_currencies_one?: Maybe<Currencies>;
  /** insert data into the table: "payment_offer" */
  readonly insert_payment_offer?: Maybe<Payment_Offer_Mutation_Response>;
  /** insert a single row into the table: "payment_offer" */
  readonly insert_payment_offer_one?: Maybe<Payment_Offer>;
  /** insert data into the table: "payments" */
  readonly insert_payments?: Maybe<Payments_Mutation_Response>;
  /** insert a single row into the table: "payments" */
  readonly insert_payments_one?: Maybe<Payments>;
  /** insert data into the table: "payout" */
  readonly insert_payout?: Maybe<Payout_Mutation_Response>;
  /** insert a single row into the table: "payout" */
  readonly insert_payout_one?: Maybe<Payout>;
  /** insert data into the table: "service" */
  readonly insert_service?: Maybe<Service_Mutation_Response>;
  /** insert a single row into the table: "service" */
  readonly insert_service_one?: Maybe<Service>;
  /** insert data into the table: "service_type" */
  readonly insert_service_type?: Maybe<Service_Type_Mutation_Response>;
  /** insert a single row into the table: "service_type" */
  readonly insert_service_type_one?: Maybe<Service_Type>;
  /** insert data into the table: "sessions" */
  readonly insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  readonly insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "states" */
  readonly insert_states?: Maybe<States_Mutation_Response>;
  /** insert a single row into the table: "states" */
  readonly insert_states_one?: Maybe<States>;
  /** insert data into the table: "task" */
  readonly insert_task?: Maybe<Task_Mutation_Response>;
  /** insert a single row into the table: "task" */
  readonly insert_task_one?: Maybe<Task>;
  /** insert data into the table: "transaction" */
  readonly insert_transaction?: Maybe<Transaction_Mutation_Response>;
  /** insert a single row into the table: "transaction" */
  readonly insert_transaction_one?: Maybe<Transaction>;
  /** insert data into the table: "user_email_verification" */
  readonly insert_user_email_verification?: Maybe<User_Email_Verification_Mutation_Response>;
  /** insert a single row into the table: "user_email_verification" */
  readonly insert_user_email_verification_one?: Maybe<User_Email_Verification>;
  /** insert data into the table: "user_meta" */
  readonly insert_user_meta?: Maybe<User_Meta_Mutation_Response>;
  /** insert a single row into the table: "user_meta" */
  readonly insert_user_meta_one?: Maybe<User_Meta>;
  /** insert data into the table: "user_phones" */
  readonly insert_user_phones?: Maybe<User_Phones_Mutation_Response>;
  /** insert a single row into the table: "user_phones" */
  readonly insert_user_phones_one?: Maybe<User_Phones>;
  /** insert data into the table: "users" */
  readonly insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  readonly insert_users_one?: Maybe<Users>;
  /** insert data into the table: "verification_requests" */
  readonly insert_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** insert a single row into the table: "verification_requests" */
  readonly insert_verification_requests_one?: Maybe<Verification_Requests>;
  /** update data of the table: "accounts" */
  readonly update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update data of the table: "cities" */
  readonly update_cities?: Maybe<Cities_Mutation_Response>;
  /** update single row of the table: "cities" */
  readonly update_cities_by_pk?: Maybe<Cities>;
  /** update data of the table: "countries" */
  readonly update_countries?: Maybe<Countries_Mutation_Response>;
  /** update single row of the table: "countries" */
  readonly update_countries_by_pk?: Maybe<Countries>;
  /** update data of the table: "currencies" */
  readonly update_currencies?: Maybe<Currencies_Mutation_Response>;
  /** update single row of the table: "currencies" */
  readonly update_currencies_by_pk?: Maybe<Currencies>;
  /** update data of the table: "payment_offer" */
  readonly update_payment_offer?: Maybe<Payment_Offer_Mutation_Response>;
  /** update single row of the table: "payment_offer" */
  readonly update_payment_offer_by_pk?: Maybe<Payment_Offer>;
  /** update data of the table: "payments" */
  readonly update_payments?: Maybe<Payments_Mutation_Response>;
  /** update single row of the table: "payments" */
  readonly update_payments_by_pk?: Maybe<Payments>;
  /** update data of the table: "payout" */
  readonly update_payout?: Maybe<Payout_Mutation_Response>;
  /** update single row of the table: "payout" */
  readonly update_payout_by_pk?: Maybe<Payout>;
  /** update data of the table: "service" */
  readonly update_service?: Maybe<Service_Mutation_Response>;
  /** update single row of the table: "service" */
  readonly update_service_by_pk?: Maybe<Service>;
  /** update data of the table: "service_type" */
  readonly update_service_type?: Maybe<Service_Type_Mutation_Response>;
  /** update single row of the table: "service_type" */
  readonly update_service_type_by_pk?: Maybe<Service_Type>;
  /** update data of the table: "sessions" */
  readonly update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  readonly update_sessions_by_pk?: Maybe<Sessions>;
  /** update data of the table: "states" */
  readonly update_states?: Maybe<States_Mutation_Response>;
  /** update single row of the table: "states" */
  readonly update_states_by_pk?: Maybe<States>;
  /** update data of the table: "task" */
  readonly update_task?: Maybe<Task_Mutation_Response>;
  /** update single row of the table: "task" */
  readonly update_task_by_pk?: Maybe<Task>;
  /** update data of the table: "transaction" */
  readonly update_transaction?: Maybe<Transaction_Mutation_Response>;
  /** update single row of the table: "transaction" */
  readonly update_transaction_by_pk?: Maybe<Transaction>;
  /** update data of the table: "user_email_verification" */
  readonly update_user_email_verification?: Maybe<User_Email_Verification_Mutation_Response>;
  /** update single row of the table: "user_email_verification" */
  readonly update_user_email_verification_by_pk?: Maybe<User_Email_Verification>;
  /** update data of the table: "user_meta" */
  readonly update_user_meta?: Maybe<User_Meta_Mutation_Response>;
  /** update single row of the table: "user_meta" */
  readonly update_user_meta_by_pk?: Maybe<User_Meta>;
  /** update data of the table: "user_phones" */
  readonly update_user_phones?: Maybe<User_Phones_Mutation_Response>;
  /** update single row of the table: "user_phones" */
  readonly update_user_phones_by_pk?: Maybe<User_Phones>;
  /** update data of the table: "users" */
  readonly update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  readonly update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "verification_requests" */
  readonly update_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
  /** update single row of the table: "verification_requests" */
  readonly update_verification_requests_by_pk?: Maybe<Verification_Requests>;
};


/** mutation root */
export type Mutation_RootActionNameArgs = {
  arg1: SampleInput;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CitiesArgs = {
  where: Cities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CountriesArgs = {
  where: Countries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Countries_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CurrenciesArgs = {
  where: Currencies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Currencies_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Payment_OfferArgs = {
  where: Payment_Offer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payment_Offer_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PaymentsArgs = {
  where: Payments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PayoutArgs = {
  where: Payout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Payout_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ServiceArgs = {
  where: Service_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Service_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Service_TypeArgs = {
  where: Service_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Service_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_StatesArgs = {
  where: States_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_States_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TaskArgs = {
  where: Task_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionArgs = {
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transaction_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_Email_VerificationArgs = {
  where: User_Email_Verification_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Email_Verification_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_MetaArgs = {
  where: User_Meta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Meta_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_PhonesArgs = {
  where: User_Phones_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Phones_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Verification_RequestsArgs = {
  where: Verification_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Verification_Requests_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: ReadonlyArray<Accounts_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
  object: Accounts_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_CitiesArgs = {
  objects: ReadonlyArray<Cities_Insert_Input>;
  on_conflict?: Maybe<Cities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cities_OneArgs = {
  object: Cities_Insert_Input;
  on_conflict?: Maybe<Cities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CountriesArgs = {
  objects: ReadonlyArray<Countries_Insert_Input>;
  on_conflict?: Maybe<Countries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Countries_OneArgs = {
  object: Countries_Insert_Input;
  on_conflict?: Maybe<Countries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CurrenciesArgs = {
  objects: ReadonlyArray<Currencies_Insert_Input>;
  on_conflict?: Maybe<Currencies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Currencies_OneArgs = {
  object: Currencies_Insert_Input;
  on_conflict?: Maybe<Currencies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_OfferArgs = {
  objects: ReadonlyArray<Payment_Offer_Insert_Input>;
  on_conflict?: Maybe<Payment_Offer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payment_Offer_OneArgs = {
  object: Payment_Offer_Insert_Input;
  on_conflict?: Maybe<Payment_Offer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PaymentsArgs = {
  objects: ReadonlyArray<Payments_Insert_Input>;
  on_conflict?: Maybe<Payments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payments_OneArgs = {
  object: Payments_Insert_Input;
  on_conflict?: Maybe<Payments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PayoutArgs = {
  objects: ReadonlyArray<Payout_Insert_Input>;
  on_conflict?: Maybe<Payout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Payout_OneArgs = {
  object: Payout_Insert_Input;
  on_conflict?: Maybe<Payout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ServiceArgs = {
  objects: ReadonlyArray<Service_Insert_Input>;
  on_conflict?: Maybe<Service_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Service_OneArgs = {
  object: Service_Insert_Input;
  on_conflict?: Maybe<Service_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Service_TypeArgs = {
  objects: ReadonlyArray<Service_Type_Insert_Input>;
  on_conflict?: Maybe<Service_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Service_Type_OneArgs = {
  object: Service_Type_Insert_Input;
  on_conflict?: Maybe<Service_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: ReadonlyArray<Sessions_Insert_Input>;
  on_conflict?: Maybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: Maybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StatesArgs = {
  objects: ReadonlyArray<States_Insert_Input>;
  on_conflict?: Maybe<States_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_States_OneArgs = {
  object: States_Insert_Input;
  on_conflict?: Maybe<States_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TaskArgs = {
  objects: ReadonlyArray<Task_Insert_Input>;
  on_conflict?: Maybe<Task_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_OneArgs = {
  object: Task_Insert_Input;
  on_conflict?: Maybe<Task_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionArgs = {
  objects: ReadonlyArray<Transaction_Insert_Input>;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transaction_OneArgs = {
  object: Transaction_Insert_Input;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Email_VerificationArgs = {
  objects: ReadonlyArray<User_Email_Verification_Insert_Input>;
  on_conflict?: Maybe<User_Email_Verification_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Email_Verification_OneArgs = {
  object: User_Email_Verification_Insert_Input;
  on_conflict?: Maybe<User_Email_Verification_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_MetaArgs = {
  objects: ReadonlyArray<User_Meta_Insert_Input>;
  on_conflict?: Maybe<User_Meta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Meta_OneArgs = {
  object: User_Meta_Insert_Input;
  on_conflict?: Maybe<User_Meta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_PhonesArgs = {
  objects: ReadonlyArray<User_Phones_Insert_Input>;
  on_conflict?: Maybe<User_Phones_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Phones_OneArgs = {
  object: User_Phones_Insert_Input;
  on_conflict?: Maybe<User_Phones_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: ReadonlyArray<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Verification_RequestsArgs = {
  objects: ReadonlyArray<Verification_Requests_Insert_Input>;
  on_conflict?: Maybe<Verification_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Verification_Requests_OneArgs = {
  object: Verification_Requests_Insert_Input;
  on_conflict?: Maybe<Verification_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _set?: Maybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CitiesArgs = {
  _inc?: Maybe<Cities_Inc_Input>;
  _set?: Maybe<Cities_Set_Input>;
  where: Cities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cities_By_PkArgs = {
  _inc?: Maybe<Cities_Inc_Input>;
  _set?: Maybe<Cities_Set_Input>;
  pk_columns: Cities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CountriesArgs = {
  _inc?: Maybe<Countries_Inc_Input>;
  _set?: Maybe<Countries_Set_Input>;
  where: Countries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Countries_By_PkArgs = {
  _inc?: Maybe<Countries_Inc_Input>;
  _set?: Maybe<Countries_Set_Input>;
  pk_columns: Countries_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CurrenciesArgs = {
  _set?: Maybe<Currencies_Set_Input>;
  where: Currencies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Currencies_By_PkArgs = {
  _set?: Maybe<Currencies_Set_Input>;
  pk_columns: Currencies_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_OfferArgs = {
  _inc?: Maybe<Payment_Offer_Inc_Input>;
  _set?: Maybe<Payment_Offer_Set_Input>;
  where: Payment_Offer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payment_Offer_By_PkArgs = {
  _inc?: Maybe<Payment_Offer_Inc_Input>;
  _set?: Maybe<Payment_Offer_Set_Input>;
  pk_columns: Payment_Offer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PaymentsArgs = {
  _inc?: Maybe<Payments_Inc_Input>;
  _set?: Maybe<Payments_Set_Input>;
  where: Payments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payments_By_PkArgs = {
  _inc?: Maybe<Payments_Inc_Input>;
  _set?: Maybe<Payments_Set_Input>;
  pk_columns: Payments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PayoutArgs = {
  _set?: Maybe<Payout_Set_Input>;
  where: Payout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Payout_By_PkArgs = {
  _set?: Maybe<Payout_Set_Input>;
  pk_columns: Payout_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ServiceArgs = {
  _set?: Maybe<Service_Set_Input>;
  where: Service_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Service_By_PkArgs = {
  _set?: Maybe<Service_Set_Input>;
  pk_columns: Service_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Service_TypeArgs = {
  _set?: Maybe<Service_Type_Set_Input>;
  where: Service_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Service_Type_By_PkArgs = {
  _set?: Maybe<Service_Type_Set_Input>;
  pk_columns: Service_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _set?: Maybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _set?: Maybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_StatesArgs = {
  _set?: Maybe<States_Set_Input>;
  where: States_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_States_By_PkArgs = {
  _set?: Maybe<States_Set_Input>;
  pk_columns: States_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TaskArgs = {
  _set?: Maybe<Task_Set_Input>;
  where: Task_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_By_PkArgs = {
  _set?: Maybe<Task_Set_Input>;
  pk_columns: Task_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionArgs = {
  _inc?: Maybe<Transaction_Inc_Input>;
  _set?: Maybe<Transaction_Set_Input>;
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transaction_By_PkArgs = {
  _inc?: Maybe<Transaction_Inc_Input>;
  _set?: Maybe<Transaction_Set_Input>;
  pk_columns: Transaction_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Email_VerificationArgs = {
  _set?: Maybe<User_Email_Verification_Set_Input>;
  where: User_Email_Verification_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Email_Verification_By_PkArgs = {
  _set?: Maybe<User_Email_Verification_Set_Input>;
  pk_columns: User_Email_Verification_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_MetaArgs = {
  _set?: Maybe<User_Meta_Set_Input>;
  where: User_Meta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Meta_By_PkArgs = {
  _set?: Maybe<User_Meta_Set_Input>;
  pk_columns: User_Meta_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_PhonesArgs = {
  _inc?: Maybe<User_Phones_Inc_Input>;
  _set?: Maybe<User_Phones_Set_Input>;
  where: User_Phones_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Phones_By_PkArgs = {
  _inc?: Maybe<User_Phones_Inc_Input>;
  _set?: Maybe<User_Phones_Set_Input>;
  pk_columns: User_Phones_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Verification_RequestsArgs = {
  _set?: Maybe<Verification_Requests_Set_Input>;
  where: Verification_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Verification_Requests_By_PkArgs = {
  _set?: Maybe<Verification_Requests_Set_Input>;
  pk_columns: Verification_Requests_Pk_Columns_Input;
};


/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['numeric']>;
  readonly _gt?: Maybe<Scalars['numeric']>;
  readonly _gte?: Maybe<Scalars['numeric']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['numeric']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['numeric']>;
  readonly _lte?: Maybe<Scalars['numeric']>;
  readonly _neq?: Maybe<Scalars['numeric']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "payment_offer" */
export type Payment_Offer = {
  readonly __typename?: 'payment_offer';
  readonly base_rate: Scalars['numeric'];
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly fees_with_promo: Scalars['numeric'];
  readonly id: Scalars['uuid'];
  readonly metadata?: Maybe<Scalars['String']>;
  readonly our_fee: Scalars['numeric'];
  readonly payment_intent_request?: Maybe<Scalars['String']>;
  readonly payment_intent_response?: Maybe<Scalars['String']>;
  readonly payment_mode?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly rate_adjustment: Scalars['numeric'];
  readonly source_amount: Scalars['numeric'];
  readonly source_currency?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly target_currency?: Maybe<Scalars['String']>;
  readonly total_in_target_with_charges: Scalars['numeric'];
  readonly total_to_pay_in_source_currency: Scalars['numeric'];
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "payment_offer" */
export type Payment_Offer_Aggregate = {
  readonly __typename?: 'payment_offer_aggregate';
  readonly aggregate?: Maybe<Payment_Offer_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Payment_Offer>;
};

/** aggregate fields of "payment_offer" */
export type Payment_Offer_Aggregate_Fields = {
  readonly __typename?: 'payment_offer_aggregate_fields';
  readonly avg?: Maybe<Payment_Offer_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Payment_Offer_Max_Fields>;
  readonly min?: Maybe<Payment_Offer_Min_Fields>;
  readonly stddev?: Maybe<Payment_Offer_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Payment_Offer_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Payment_Offer_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Payment_Offer_Sum_Fields>;
  readonly var_pop?: Maybe<Payment_Offer_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Payment_Offer_Var_Samp_Fields>;
  readonly variance?: Maybe<Payment_Offer_Variance_Fields>;
};


/** aggregate fields of "payment_offer" */
export type Payment_Offer_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payment_offer" */
export type Payment_Offer_Aggregate_Order_By = {
  readonly avg?: Maybe<Payment_Offer_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Payment_Offer_Max_Order_By>;
  readonly min?: Maybe<Payment_Offer_Min_Order_By>;
  readonly stddev?: Maybe<Payment_Offer_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Payment_Offer_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Payment_Offer_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Payment_Offer_Sum_Order_By>;
  readonly var_pop?: Maybe<Payment_Offer_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Payment_Offer_Var_Samp_Order_By>;
  readonly variance?: Maybe<Payment_Offer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment_offer" */
export type Payment_Offer_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Payment_Offer_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Payment_Offer_On_Conflict>;
};

/** aggregate avg on columns */
export type Payment_Offer_Avg_Fields = {
  readonly __typename?: 'payment_offer_avg_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payment_offer" */
export type Payment_Offer_Avg_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payment_offer". All fields are combined with a logical 'AND'. */
export type Payment_Offer_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Payment_Offer_Bool_Exp>>;
  readonly _not?: Maybe<Payment_Offer_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Payment_Offer_Bool_Exp>>;
  readonly base_rate?: Maybe<Numeric_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly fees_with_promo?: Maybe<Numeric_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly metadata?: Maybe<String_Comparison_Exp>;
  readonly our_fee?: Maybe<Numeric_Comparison_Exp>;
  readonly payment_intent_request?: Maybe<String_Comparison_Exp>;
  readonly payment_intent_response?: Maybe<String_Comparison_Exp>;
  readonly payment_mode?: Maybe<String_Comparison_Exp>;
  readonly payment_status?: Maybe<String_Comparison_Exp>;
  readonly rate_adjustment?: Maybe<Numeric_Comparison_Exp>;
  readonly source_amount?: Maybe<Numeric_Comparison_Exp>;
  readonly source_currency?: Maybe<String_Comparison_Exp>;
  readonly status?: Maybe<String_Comparison_Exp>;
  readonly target_currency?: Maybe<String_Comparison_Exp>;
  readonly total_in_target_with_charges?: Maybe<Numeric_Comparison_Exp>;
  readonly total_to_pay_in_source_currency?: Maybe<Numeric_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "payment_offer" */
export enum Payment_Offer_Constraint {
  /** unique or primary key constraint */
  PaymentOfferPkey = 'payment_offer_pkey'
}

/** input type for incrementing numeric columns in table "payment_offer" */
export type Payment_Offer_Inc_Input = {
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "payment_offer" */
export type Payment_Offer_Insert_Input = {
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly metadata?: Maybe<Scalars['String']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly payment_intent_request?: Maybe<Scalars['String']>;
  readonly payment_intent_response?: Maybe<Scalars['String']>;
  readonly payment_mode?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly source_currency?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly target_currency?: Maybe<Scalars['String']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Payment_Offer_Max_Fields = {
  readonly __typename?: 'payment_offer_max_fields';
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly metadata?: Maybe<Scalars['String']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly payment_intent_request?: Maybe<Scalars['String']>;
  readonly payment_intent_response?: Maybe<Scalars['String']>;
  readonly payment_mode?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly source_currency?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly target_currency?: Maybe<Scalars['String']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "payment_offer" */
export type Payment_Offer_Max_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly metadata?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly payment_intent_request?: Maybe<Order_By>;
  readonly payment_intent_response?: Maybe<Order_By>;
  readonly payment_mode?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly source_currency?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly target_currency?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Payment_Offer_Min_Fields = {
  readonly __typename?: 'payment_offer_min_fields';
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly metadata?: Maybe<Scalars['String']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly payment_intent_request?: Maybe<Scalars['String']>;
  readonly payment_intent_response?: Maybe<Scalars['String']>;
  readonly payment_mode?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly source_currency?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly target_currency?: Maybe<Scalars['String']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "payment_offer" */
export type Payment_Offer_Min_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly metadata?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly payment_intent_request?: Maybe<Order_By>;
  readonly payment_intent_response?: Maybe<Order_By>;
  readonly payment_mode?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly source_currency?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly target_currency?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "payment_offer" */
export type Payment_Offer_Mutation_Response = {
  readonly __typename?: 'payment_offer_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Payment_Offer>;
};

/** on conflict condition type for table "payment_offer" */
export type Payment_Offer_On_Conflict = {
  readonly constraint: Payment_Offer_Constraint;
  readonly update_columns?: ReadonlyArray<Payment_Offer_Update_Column>;
  readonly where?: Maybe<Payment_Offer_Bool_Exp>;
};

/** Ordering options when selecting data from "payment_offer". */
export type Payment_Offer_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly metadata?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly payment_intent_request?: Maybe<Order_By>;
  readonly payment_intent_response?: Maybe<Order_By>;
  readonly payment_mode?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly source_currency?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly target_currency?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: payment_offer */
export type Payment_Offer_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "payment_offer" */
export enum Payment_Offer_Select_Column {
  /** column name */
  BaseRate = 'base_rate',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeesWithPromo = 'fees_with_promo',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  OurFee = 'our_fee',
  /** column name */
  PaymentIntentRequest = 'payment_intent_request',
  /** column name */
  PaymentIntentResponse = 'payment_intent_response',
  /** column name */
  PaymentMode = 'payment_mode',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  RateAdjustment = 'rate_adjustment',
  /** column name */
  SourceAmount = 'source_amount',
  /** column name */
  SourceCurrency = 'source_currency',
  /** column name */
  Status = 'status',
  /** column name */
  TargetCurrency = 'target_currency',
  /** column name */
  TotalInTargetWithCharges = 'total_in_target_with_charges',
  /** column name */
  TotalToPayInSourceCurrency = 'total_to_pay_in_source_currency',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "payment_offer" */
export type Payment_Offer_Set_Input = {
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly metadata?: Maybe<Scalars['String']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly payment_intent_request?: Maybe<Scalars['String']>;
  readonly payment_intent_response?: Maybe<Scalars['String']>;
  readonly payment_mode?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly source_currency?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly target_currency?: Maybe<Scalars['String']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Payment_Offer_Stddev_Fields = {
  readonly __typename?: 'payment_offer_stddev_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payment_offer" */
export type Payment_Offer_Stddev_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payment_Offer_Stddev_Pop_Fields = {
  readonly __typename?: 'payment_offer_stddev_pop_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payment_offer" */
export type Payment_Offer_Stddev_Pop_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payment_Offer_Stddev_Samp_Fields = {
  readonly __typename?: 'payment_offer_stddev_samp_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payment_offer" */
export type Payment_Offer_Stddev_Samp_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Payment_Offer_Sum_Fields = {
  readonly __typename?: 'payment_offer_sum_fields';
  readonly base_rate?: Maybe<Scalars['numeric']>;
  readonly fees_with_promo?: Maybe<Scalars['numeric']>;
  readonly our_fee?: Maybe<Scalars['numeric']>;
  readonly rate_adjustment?: Maybe<Scalars['numeric']>;
  readonly source_amount?: Maybe<Scalars['numeric']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['numeric']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "payment_offer" */
export type Payment_Offer_Sum_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** update columns of table "payment_offer" */
export enum Payment_Offer_Update_Column {
  /** column name */
  BaseRate = 'base_rate',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeesWithPromo = 'fees_with_promo',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  OurFee = 'our_fee',
  /** column name */
  PaymentIntentRequest = 'payment_intent_request',
  /** column name */
  PaymentIntentResponse = 'payment_intent_response',
  /** column name */
  PaymentMode = 'payment_mode',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  RateAdjustment = 'rate_adjustment',
  /** column name */
  SourceAmount = 'source_amount',
  /** column name */
  SourceCurrency = 'source_currency',
  /** column name */
  Status = 'status',
  /** column name */
  TargetCurrency = 'target_currency',
  /** column name */
  TotalInTargetWithCharges = 'total_in_target_with_charges',
  /** column name */
  TotalToPayInSourceCurrency = 'total_to_pay_in_source_currency',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Payment_Offer_Var_Pop_Fields = {
  readonly __typename?: 'payment_offer_var_pop_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payment_offer" */
export type Payment_Offer_Var_Pop_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payment_Offer_Var_Samp_Fields = {
  readonly __typename?: 'payment_offer_var_samp_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payment_offer" */
export type Payment_Offer_Var_Samp_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Payment_Offer_Variance_Fields = {
  readonly __typename?: 'payment_offer_variance_fields';
  readonly base_rate?: Maybe<Scalars['Float']>;
  readonly fees_with_promo?: Maybe<Scalars['Float']>;
  readonly our_fee?: Maybe<Scalars['Float']>;
  readonly rate_adjustment?: Maybe<Scalars['Float']>;
  readonly source_amount?: Maybe<Scalars['Float']>;
  readonly total_in_target_with_charges?: Maybe<Scalars['Float']>;
  readonly total_to_pay_in_source_currency?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payment_offer" */
export type Payment_Offer_Variance_Order_By = {
  readonly base_rate?: Maybe<Order_By>;
  readonly fees_with_promo?: Maybe<Order_By>;
  readonly our_fee?: Maybe<Order_By>;
  readonly rate_adjustment?: Maybe<Order_By>;
  readonly source_amount?: Maybe<Order_By>;
  readonly total_in_target_with_charges?: Maybe<Order_By>;
  readonly total_to_pay_in_source_currency?: Maybe<Order_By>;
};

/** columns and relationships of "payments" */
export type Payments = {
  readonly __typename?: 'payments';
  readonly account_id?: Maybe<Scalars['String']>;
  readonly amount: Scalars['numeric'];
  readonly amount_settled: Scalars['numeric'];
  readonly app_fee: Scalars['numeric'];
  readonly auth_model?: Maybe<Scalars['String']>;
  readonly card_country?: Maybe<Scalars['String']>;
  readonly card_expiry?: Maybe<Scalars['String']>;
  readonly card_first_6digits?: Maybe<Scalars['String']>;
  readonly card_issuer?: Maybe<Scalars['String']>;
  readonly card_last_4digits?: Maybe<Scalars['String']>;
  readonly card_token?: Maybe<Scalars['String']>;
  readonly card_type?: Maybe<Scalars['String']>;
  readonly charged_amount: Scalars['numeric'];
  readonly created_at: Scalars['timestamptz'];
  readonly currency?: Maybe<Scalars['String']>;
  readonly customer_created_at?: Maybe<Scalars['String']>;
  readonly customer_email?: Maybe<Scalars['String']>;
  readonly customer_id?: Maybe<Scalars['String']>;
  readonly customer_name?: Maybe<Scalars['String']>;
  readonly customer_phone_number?: Maybe<Scalars['String']>;
  readonly device_fingerprint?: Maybe<Scalars['String']>;
  readonly flw_ref?: Maybe<Scalars['String']>;
  readonly id: Scalars['uuid'];
  readonly ip?: Maybe<Scalars['String']>;
  readonly merchant_fee: Scalars['numeric'];
  readonly narration?: Maybe<Scalars['String']>;
  readonly payment_created_at?: Maybe<Scalars['String']>;
  readonly payment_provider_id?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly payment_type?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly payouts: ReadonlyArray<Payout>;
  /** An aggregate relationship */
  readonly payouts_aggregate: Payout_Aggregate;
  readonly processor_response?: Maybe<Scalars['String']>;
  readonly raw_response?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tx_ref?: Maybe<Scalars['String']>;
  readonly updated_at: Scalars['timestamptz'];
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "payments" */
export type PaymentsPayoutsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


/** columns and relationships of "payments" */
export type PaymentsPayouts_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};

/** aggregated selection of "payments" */
export type Payments_Aggregate = {
  readonly __typename?: 'payments_aggregate';
  readonly aggregate?: Maybe<Payments_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Payments>;
};

/** aggregate fields of "payments" */
export type Payments_Aggregate_Fields = {
  readonly __typename?: 'payments_aggregate_fields';
  readonly avg?: Maybe<Payments_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Payments_Max_Fields>;
  readonly min?: Maybe<Payments_Min_Fields>;
  readonly stddev?: Maybe<Payments_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Payments_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Payments_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Payments_Sum_Fields>;
  readonly var_pop?: Maybe<Payments_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Payments_Var_Samp_Fields>;
  readonly variance?: Maybe<Payments_Variance_Fields>;
};


/** aggregate fields of "payments" */
export type Payments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payments" */
export type Payments_Aggregate_Order_By = {
  readonly avg?: Maybe<Payments_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Payments_Max_Order_By>;
  readonly min?: Maybe<Payments_Min_Order_By>;
  readonly stddev?: Maybe<Payments_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Payments_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Payments_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Payments_Sum_Order_By>;
  readonly var_pop?: Maybe<Payments_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Payments_Var_Samp_Order_By>;
  readonly variance?: Maybe<Payments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payments" */
export type Payments_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Payments_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Payments_On_Conflict>;
};

/** aggregate avg on columns */
export type Payments_Avg_Fields = {
  readonly __typename?: 'payments_avg_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "payments" */
export type Payments_Avg_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "payments". All fields are combined with a logical 'AND'. */
export type Payments_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Payments_Bool_Exp>>;
  readonly _not?: Maybe<Payments_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Payments_Bool_Exp>>;
  readonly account_id?: Maybe<String_Comparison_Exp>;
  readonly amount?: Maybe<Numeric_Comparison_Exp>;
  readonly amount_settled?: Maybe<Numeric_Comparison_Exp>;
  readonly app_fee?: Maybe<Numeric_Comparison_Exp>;
  readonly auth_model?: Maybe<String_Comparison_Exp>;
  readonly card_country?: Maybe<String_Comparison_Exp>;
  readonly card_expiry?: Maybe<String_Comparison_Exp>;
  readonly card_first_6digits?: Maybe<String_Comparison_Exp>;
  readonly card_issuer?: Maybe<String_Comparison_Exp>;
  readonly card_last_4digits?: Maybe<String_Comparison_Exp>;
  readonly card_token?: Maybe<String_Comparison_Exp>;
  readonly card_type?: Maybe<String_Comparison_Exp>;
  readonly charged_amount?: Maybe<Numeric_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly currency?: Maybe<String_Comparison_Exp>;
  readonly customer_created_at?: Maybe<String_Comparison_Exp>;
  readonly customer_email?: Maybe<String_Comparison_Exp>;
  readonly customer_id?: Maybe<String_Comparison_Exp>;
  readonly customer_name?: Maybe<String_Comparison_Exp>;
  readonly customer_phone_number?: Maybe<String_Comparison_Exp>;
  readonly device_fingerprint?: Maybe<String_Comparison_Exp>;
  readonly flw_ref?: Maybe<String_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly ip?: Maybe<String_Comparison_Exp>;
  readonly merchant_fee?: Maybe<Numeric_Comparison_Exp>;
  readonly narration?: Maybe<String_Comparison_Exp>;
  readonly payment_created_at?: Maybe<String_Comparison_Exp>;
  readonly payment_provider_id?: Maybe<String_Comparison_Exp>;
  readonly payment_status?: Maybe<String_Comparison_Exp>;
  readonly payment_type?: Maybe<String_Comparison_Exp>;
  readonly payouts?: Maybe<Payout_Bool_Exp>;
  readonly processor_response?: Maybe<String_Comparison_Exp>;
  readonly raw_response?: Maybe<String_Comparison_Exp>;
  readonly status?: Maybe<String_Comparison_Exp>;
  readonly tx_ref?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "payments" */
export enum Payments_Constraint {
  /** unique or primary key constraint */
  PaymentsPkey = 'payments_pkey'
}

/** input type for incrementing numeric columns in table "payments" */
export type Payments_Inc_Input = {
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "payments" */
export type Payments_Insert_Input = {
  readonly account_id?: Maybe<Scalars['String']>;
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly auth_model?: Maybe<Scalars['String']>;
  readonly card_country?: Maybe<Scalars['String']>;
  readonly card_expiry?: Maybe<Scalars['String']>;
  readonly card_first_6digits?: Maybe<Scalars['String']>;
  readonly card_issuer?: Maybe<Scalars['String']>;
  readonly card_last_4digits?: Maybe<Scalars['String']>;
  readonly card_token?: Maybe<Scalars['String']>;
  readonly card_type?: Maybe<Scalars['String']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly currency?: Maybe<Scalars['String']>;
  readonly customer_created_at?: Maybe<Scalars['String']>;
  readonly customer_email?: Maybe<Scalars['String']>;
  readonly customer_id?: Maybe<Scalars['String']>;
  readonly customer_name?: Maybe<Scalars['String']>;
  readonly customer_phone_number?: Maybe<Scalars['String']>;
  readonly device_fingerprint?: Maybe<Scalars['String']>;
  readonly flw_ref?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly ip?: Maybe<Scalars['String']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
  readonly narration?: Maybe<Scalars['String']>;
  readonly payment_created_at?: Maybe<Scalars['String']>;
  readonly payment_provider_id?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly payment_type?: Maybe<Scalars['String']>;
  readonly payouts?: Maybe<Payout_Arr_Rel_Insert_Input>;
  readonly processor_response?: Maybe<Scalars['String']>;
  readonly raw_response?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tx_ref?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Payments_Max_Fields = {
  readonly __typename?: 'payments_max_fields';
  readonly account_id?: Maybe<Scalars['String']>;
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly auth_model?: Maybe<Scalars['String']>;
  readonly card_country?: Maybe<Scalars['String']>;
  readonly card_expiry?: Maybe<Scalars['String']>;
  readonly card_first_6digits?: Maybe<Scalars['String']>;
  readonly card_issuer?: Maybe<Scalars['String']>;
  readonly card_last_4digits?: Maybe<Scalars['String']>;
  readonly card_token?: Maybe<Scalars['String']>;
  readonly card_type?: Maybe<Scalars['String']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly currency?: Maybe<Scalars['String']>;
  readonly customer_created_at?: Maybe<Scalars['String']>;
  readonly customer_email?: Maybe<Scalars['String']>;
  readonly customer_id?: Maybe<Scalars['String']>;
  readonly customer_name?: Maybe<Scalars['String']>;
  readonly customer_phone_number?: Maybe<Scalars['String']>;
  readonly device_fingerprint?: Maybe<Scalars['String']>;
  readonly flw_ref?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly ip?: Maybe<Scalars['String']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
  readonly narration?: Maybe<Scalars['String']>;
  readonly payment_created_at?: Maybe<Scalars['String']>;
  readonly payment_provider_id?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly payment_type?: Maybe<Scalars['String']>;
  readonly processor_response?: Maybe<Scalars['String']>;
  readonly raw_response?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tx_ref?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "payments" */
export type Payments_Max_Order_By = {
  readonly account_id?: Maybe<Order_By>;
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly auth_model?: Maybe<Order_By>;
  readonly card_country?: Maybe<Order_By>;
  readonly card_expiry?: Maybe<Order_By>;
  readonly card_first_6digits?: Maybe<Order_By>;
  readonly card_issuer?: Maybe<Order_By>;
  readonly card_last_4digits?: Maybe<Order_By>;
  readonly card_token?: Maybe<Order_By>;
  readonly card_type?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly currency?: Maybe<Order_By>;
  readonly customer_created_at?: Maybe<Order_By>;
  readonly customer_email?: Maybe<Order_By>;
  readonly customer_id?: Maybe<Order_By>;
  readonly customer_name?: Maybe<Order_By>;
  readonly customer_phone_number?: Maybe<Order_By>;
  readonly device_fingerprint?: Maybe<Order_By>;
  readonly flw_ref?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly ip?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
  readonly narration?: Maybe<Order_By>;
  readonly payment_created_at?: Maybe<Order_By>;
  readonly payment_provider_id?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly payment_type?: Maybe<Order_By>;
  readonly processor_response?: Maybe<Order_By>;
  readonly raw_response?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly tx_ref?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Payments_Min_Fields = {
  readonly __typename?: 'payments_min_fields';
  readonly account_id?: Maybe<Scalars['String']>;
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly auth_model?: Maybe<Scalars['String']>;
  readonly card_country?: Maybe<Scalars['String']>;
  readonly card_expiry?: Maybe<Scalars['String']>;
  readonly card_first_6digits?: Maybe<Scalars['String']>;
  readonly card_issuer?: Maybe<Scalars['String']>;
  readonly card_last_4digits?: Maybe<Scalars['String']>;
  readonly card_token?: Maybe<Scalars['String']>;
  readonly card_type?: Maybe<Scalars['String']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly currency?: Maybe<Scalars['String']>;
  readonly customer_created_at?: Maybe<Scalars['String']>;
  readonly customer_email?: Maybe<Scalars['String']>;
  readonly customer_id?: Maybe<Scalars['String']>;
  readonly customer_name?: Maybe<Scalars['String']>;
  readonly customer_phone_number?: Maybe<Scalars['String']>;
  readonly device_fingerprint?: Maybe<Scalars['String']>;
  readonly flw_ref?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly ip?: Maybe<Scalars['String']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
  readonly narration?: Maybe<Scalars['String']>;
  readonly payment_created_at?: Maybe<Scalars['String']>;
  readonly payment_provider_id?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly payment_type?: Maybe<Scalars['String']>;
  readonly processor_response?: Maybe<Scalars['String']>;
  readonly raw_response?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tx_ref?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "payments" */
export type Payments_Min_Order_By = {
  readonly account_id?: Maybe<Order_By>;
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly auth_model?: Maybe<Order_By>;
  readonly card_country?: Maybe<Order_By>;
  readonly card_expiry?: Maybe<Order_By>;
  readonly card_first_6digits?: Maybe<Order_By>;
  readonly card_issuer?: Maybe<Order_By>;
  readonly card_last_4digits?: Maybe<Order_By>;
  readonly card_token?: Maybe<Order_By>;
  readonly card_type?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly currency?: Maybe<Order_By>;
  readonly customer_created_at?: Maybe<Order_By>;
  readonly customer_email?: Maybe<Order_By>;
  readonly customer_id?: Maybe<Order_By>;
  readonly customer_name?: Maybe<Order_By>;
  readonly customer_phone_number?: Maybe<Order_By>;
  readonly device_fingerprint?: Maybe<Order_By>;
  readonly flw_ref?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly ip?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
  readonly narration?: Maybe<Order_By>;
  readonly payment_created_at?: Maybe<Order_By>;
  readonly payment_provider_id?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly payment_type?: Maybe<Order_By>;
  readonly processor_response?: Maybe<Order_By>;
  readonly raw_response?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly tx_ref?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "payments" */
export type Payments_Mutation_Response = {
  readonly __typename?: 'payments_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Payments>;
};

/** input type for inserting object relation for remote table "payments" */
export type Payments_Obj_Rel_Insert_Input = {
  readonly data: Payments_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Payments_On_Conflict>;
};

/** on conflict condition type for table "payments" */
export type Payments_On_Conflict = {
  readonly constraint: Payments_Constraint;
  readonly update_columns?: ReadonlyArray<Payments_Update_Column>;
  readonly where?: Maybe<Payments_Bool_Exp>;
};

/** Ordering options when selecting data from "payments". */
export type Payments_Order_By = {
  readonly account_id?: Maybe<Order_By>;
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly auth_model?: Maybe<Order_By>;
  readonly card_country?: Maybe<Order_By>;
  readonly card_expiry?: Maybe<Order_By>;
  readonly card_first_6digits?: Maybe<Order_By>;
  readonly card_issuer?: Maybe<Order_By>;
  readonly card_last_4digits?: Maybe<Order_By>;
  readonly card_token?: Maybe<Order_By>;
  readonly card_type?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly currency?: Maybe<Order_By>;
  readonly customer_created_at?: Maybe<Order_By>;
  readonly customer_email?: Maybe<Order_By>;
  readonly customer_id?: Maybe<Order_By>;
  readonly customer_name?: Maybe<Order_By>;
  readonly customer_phone_number?: Maybe<Order_By>;
  readonly device_fingerprint?: Maybe<Order_By>;
  readonly flw_ref?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly ip?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
  readonly narration?: Maybe<Order_By>;
  readonly payment_created_at?: Maybe<Order_By>;
  readonly payment_provider_id?: Maybe<Order_By>;
  readonly payment_status?: Maybe<Order_By>;
  readonly payment_type?: Maybe<Order_By>;
  readonly payouts_aggregate?: Maybe<Payout_Aggregate_Order_By>;
  readonly processor_response?: Maybe<Order_By>;
  readonly raw_response?: Maybe<Order_By>;
  readonly status?: Maybe<Order_By>;
  readonly tx_ref?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: payments */
export type Payments_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "payments" */
export enum Payments_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  AmountSettled = 'amount_settled',
  /** column name */
  AppFee = 'app_fee',
  /** column name */
  AuthModel = 'auth_model',
  /** column name */
  CardCountry = 'card_country',
  /** column name */
  CardExpiry = 'card_expiry',
  /** column name */
  CardFirst_6digits = 'card_first_6digits',
  /** column name */
  CardIssuer = 'card_issuer',
  /** column name */
  CardLast_4digits = 'card_last_4digits',
  /** column name */
  CardToken = 'card_token',
  /** column name */
  CardType = 'card_type',
  /** column name */
  ChargedAmount = 'charged_amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  CustomerCreatedAt = 'customer_created_at',
  /** column name */
  CustomerEmail = 'customer_email',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  CustomerName = 'customer_name',
  /** column name */
  CustomerPhoneNumber = 'customer_phone_number',
  /** column name */
  DeviceFingerprint = 'device_fingerprint',
  /** column name */
  FlwRef = 'flw_ref',
  /** column name */
  Id = 'id',
  /** column name */
  Ip = 'ip',
  /** column name */
  MerchantFee = 'merchant_fee',
  /** column name */
  Narration = 'narration',
  /** column name */
  PaymentCreatedAt = 'payment_created_at',
  /** column name */
  PaymentProviderId = 'payment_provider_id',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  PaymentType = 'payment_type',
  /** column name */
  ProcessorResponse = 'processor_response',
  /** column name */
  RawResponse = 'raw_response',
  /** column name */
  Status = 'status',
  /** column name */
  TxRef = 'tx_ref',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "payments" */
export type Payments_Set_Input = {
  readonly account_id?: Maybe<Scalars['String']>;
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly auth_model?: Maybe<Scalars['String']>;
  readonly card_country?: Maybe<Scalars['String']>;
  readonly card_expiry?: Maybe<Scalars['String']>;
  readonly card_first_6digits?: Maybe<Scalars['String']>;
  readonly card_issuer?: Maybe<Scalars['String']>;
  readonly card_last_4digits?: Maybe<Scalars['String']>;
  readonly card_token?: Maybe<Scalars['String']>;
  readonly card_type?: Maybe<Scalars['String']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly currency?: Maybe<Scalars['String']>;
  readonly customer_created_at?: Maybe<Scalars['String']>;
  readonly customer_email?: Maybe<Scalars['String']>;
  readonly customer_id?: Maybe<Scalars['String']>;
  readonly customer_name?: Maybe<Scalars['String']>;
  readonly customer_phone_number?: Maybe<Scalars['String']>;
  readonly device_fingerprint?: Maybe<Scalars['String']>;
  readonly flw_ref?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly ip?: Maybe<Scalars['String']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
  readonly narration?: Maybe<Scalars['String']>;
  readonly payment_created_at?: Maybe<Scalars['String']>;
  readonly payment_provider_id?: Maybe<Scalars['String']>;
  readonly payment_status?: Maybe<Scalars['String']>;
  readonly payment_type?: Maybe<Scalars['String']>;
  readonly processor_response?: Maybe<Scalars['String']>;
  readonly raw_response?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Scalars['String']>;
  readonly tx_ref?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Payments_Stddev_Fields = {
  readonly __typename?: 'payments_stddev_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "payments" */
export type Payments_Stddev_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Payments_Stddev_Pop_Fields = {
  readonly __typename?: 'payments_stddev_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "payments" */
export type Payments_Stddev_Pop_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Payments_Stddev_Samp_Fields = {
  readonly __typename?: 'payments_stddev_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "payments" */
export type Payments_Stddev_Samp_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Payments_Sum_Fields = {
  readonly __typename?: 'payments_sum_fields';
  readonly amount?: Maybe<Scalars['numeric']>;
  readonly amount_settled?: Maybe<Scalars['numeric']>;
  readonly app_fee?: Maybe<Scalars['numeric']>;
  readonly charged_amount?: Maybe<Scalars['numeric']>;
  readonly merchant_fee?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "payments" */
export type Payments_Sum_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** update columns of table "payments" */
export enum Payments_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  AmountSettled = 'amount_settled',
  /** column name */
  AppFee = 'app_fee',
  /** column name */
  AuthModel = 'auth_model',
  /** column name */
  CardCountry = 'card_country',
  /** column name */
  CardExpiry = 'card_expiry',
  /** column name */
  CardFirst_6digits = 'card_first_6digits',
  /** column name */
  CardIssuer = 'card_issuer',
  /** column name */
  CardLast_4digits = 'card_last_4digits',
  /** column name */
  CardToken = 'card_token',
  /** column name */
  CardType = 'card_type',
  /** column name */
  ChargedAmount = 'charged_amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  CustomerCreatedAt = 'customer_created_at',
  /** column name */
  CustomerEmail = 'customer_email',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  CustomerName = 'customer_name',
  /** column name */
  CustomerPhoneNumber = 'customer_phone_number',
  /** column name */
  DeviceFingerprint = 'device_fingerprint',
  /** column name */
  FlwRef = 'flw_ref',
  /** column name */
  Id = 'id',
  /** column name */
  Ip = 'ip',
  /** column name */
  MerchantFee = 'merchant_fee',
  /** column name */
  Narration = 'narration',
  /** column name */
  PaymentCreatedAt = 'payment_created_at',
  /** column name */
  PaymentProviderId = 'payment_provider_id',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  PaymentType = 'payment_type',
  /** column name */
  ProcessorResponse = 'processor_response',
  /** column name */
  RawResponse = 'raw_response',
  /** column name */
  Status = 'status',
  /** column name */
  TxRef = 'tx_ref',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Payments_Var_Pop_Fields = {
  readonly __typename?: 'payments_var_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "payments" */
export type Payments_Var_Pop_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Payments_Var_Samp_Fields = {
  readonly __typename?: 'payments_var_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "payments" */
export type Payments_Var_Samp_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Payments_Variance_Fields = {
  readonly __typename?: 'payments_variance_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly amount_settled?: Maybe<Scalars['Float']>;
  readonly app_fee?: Maybe<Scalars['Float']>;
  readonly charged_amount?: Maybe<Scalars['Float']>;
  readonly merchant_fee?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "payments" */
export type Payments_Variance_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly amount_settled?: Maybe<Order_By>;
  readonly app_fee?: Maybe<Order_By>;
  readonly charged_amount?: Maybe<Order_By>;
  readonly merchant_fee?: Maybe<Order_By>;
};

/** columns and relationships of "payout" */
export type Payout = {
  readonly __typename?: 'payout';
  readonly created_at: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  /** An object relationship */
  readonly payment?: Maybe<Payments>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  readonly transaction?: Maybe<Transaction>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "payout" */
export type Payout_Aggregate = {
  readonly __typename?: 'payout_aggregate';
  readonly aggregate?: Maybe<Payout_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Payout>;
};

/** aggregate fields of "payout" */
export type Payout_Aggregate_Fields = {
  readonly __typename?: 'payout_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Payout_Max_Fields>;
  readonly min?: Maybe<Payout_Min_Fields>;
};


/** aggregate fields of "payout" */
export type Payout_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payout" */
export type Payout_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Payout_Max_Order_By>;
  readonly min?: Maybe<Payout_Min_Order_By>;
};

/** input type for inserting array relation for remote table "payout" */
export type Payout_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Payout_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Payout_On_Conflict>;
};

/** Boolean expression to filter rows from the table "payout". All fields are combined with a logical 'AND'. */
export type Payout_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Payout_Bool_Exp>>;
  readonly _not?: Maybe<Payout_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Payout_Bool_Exp>>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly payment?: Maybe<Payments_Bool_Exp>;
  readonly payment_id?: Maybe<Uuid_Comparison_Exp>;
  readonly transaction?: Maybe<Transaction_Bool_Exp>;
  readonly transaction_id?: Maybe<Uuid_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "payout" */
export enum Payout_Constraint {
  /** unique or primary key constraint */
  PayoutPkey = 'payout_pkey'
}

/** input type for inserting data into table "payout" */
export type Payout_Insert_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly payment?: Maybe<Payments_Obj_Rel_Insert_Input>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly transaction?: Maybe<Transaction_Obj_Rel_Insert_Input>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Payout_Max_Fields = {
  readonly __typename?: 'payout_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "payout" */
export type Payout_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Payout_Min_Fields = {
  readonly __typename?: 'payout_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "payout" */
export type Payout_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "payout" */
export type Payout_Mutation_Response = {
  readonly __typename?: 'payout_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Payout>;
};

/** on conflict condition type for table "payout" */
export type Payout_On_Conflict = {
  readonly constraint: Payout_Constraint;
  readonly update_columns?: ReadonlyArray<Payout_Update_Column>;
  readonly where?: Maybe<Payout_Bool_Exp>;
};

/** Ordering options when selecting data from "payout". */
export type Payout_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly payment?: Maybe<Payments_Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly transaction?: Maybe<Transaction_Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: payout */
export type Payout_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "payout" */
export enum Payout_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "payout" */
export type Payout_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "payout" */
export enum Payout_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Query_Root = {
  readonly __typename?: 'query_root';
  /** An array relationship */
  readonly accounts: ReadonlyArray<Accounts>;
  /** An aggregate relationship */
  readonly accounts_aggregate: Accounts_Aggregate;
  /** An array relationship */
  readonly cities: ReadonlyArray<Cities>;
  /** An aggregate relationship */
  readonly cities_aggregate: Cities_Aggregate;
  /** fetch data from the table: "cities" using primary key columns */
  readonly cities_by_pk?: Maybe<Cities>;
  /** fetch data from the table: "countries" */
  readonly countries: ReadonlyArray<Countries>;
  /** fetch aggregated fields from the table: "countries" */
  readonly countries_aggregate: Countries_Aggregate;
  /** fetch data from the table: "countries" using primary key columns */
  readonly countries_by_pk?: Maybe<Countries>;
  /** fetch data from the table: "currencies" */
  readonly currencies: ReadonlyArray<Currencies>;
  /** fetch aggregated fields from the table: "currencies" */
  readonly currencies_aggregate: Currencies_Aggregate;
  /** fetch data from the table: "currencies" using primary key columns */
  readonly currencies_by_pk?: Maybe<Currencies>;
  /** fetch data from the table: "payment_offer" */
  readonly payment_offer: ReadonlyArray<Payment_Offer>;
  /** fetch aggregated fields from the table: "payment_offer" */
  readonly payment_offer_aggregate: Payment_Offer_Aggregate;
  /** fetch data from the table: "payment_offer" using primary key columns */
  readonly payment_offer_by_pk?: Maybe<Payment_Offer>;
  /** An array relationship */
  readonly payments: ReadonlyArray<Payments>;
  /** An aggregate relationship */
  readonly payments_aggregate: Payments_Aggregate;
  /** fetch data from the table: "payments" using primary key columns */
  readonly payments_by_pk?: Maybe<Payments>;
  /** fetch data from the table: "payout" */
  readonly payout: ReadonlyArray<Payout>;
  /** fetch aggregated fields from the table: "payout" */
  readonly payout_aggregate: Payout_Aggregate;
  /** fetch data from the table: "payout" using primary key columns */
  readonly payout_by_pk?: Maybe<Payout>;
  /** fetch data from the table: "service" */
  readonly service: ReadonlyArray<Service>;
  /** fetch aggregated fields from the table: "service" */
  readonly service_aggregate: Service_Aggregate;
  /** fetch data from the table: "service" using primary key columns */
  readonly service_by_pk?: Maybe<Service>;
  /** fetch data from the table: "service_type" */
  readonly service_type: ReadonlyArray<Service_Type>;
  /** fetch aggregated fields from the table: "service_type" */
  readonly service_type_aggregate: Service_Type_Aggregate;
  /** fetch data from the table: "service_type" using primary key columns */
  readonly service_type_by_pk?: Maybe<Service_Type>;
  /** An array relationship */
  readonly sessions: ReadonlyArray<Sessions>;
  /** An aggregate relationship */
  readonly sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  readonly sessions_by_pk?: Maybe<Sessions>;
  /** An array relationship */
  readonly states: ReadonlyArray<States>;
  /** An aggregate relationship */
  readonly states_aggregate: States_Aggregate;
  /** fetch data from the table: "states" using primary key columns */
  readonly states_by_pk?: Maybe<States>;
  /** fetch data from the table: "task" */
  readonly task: ReadonlyArray<Task>;
  /** fetch aggregated fields from the table: "task" */
  readonly task_aggregate: Task_Aggregate;
  /** fetch data from the table: "task" using primary key columns */
  readonly task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "transaction" */
  readonly transaction: ReadonlyArray<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  readonly transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  readonly transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "user_email_verification" */
  readonly user_email_verification: ReadonlyArray<User_Email_Verification>;
  /** fetch aggregated fields from the table: "user_email_verification" */
  readonly user_email_verification_aggregate: User_Email_Verification_Aggregate;
  /** fetch data from the table: "user_email_verification" using primary key columns */
  readonly user_email_verification_by_pk?: Maybe<User_Email_Verification>;
  /** An array relationship */
  readonly user_meta: ReadonlyArray<User_Meta>;
  /** An aggregate relationship */
  readonly user_meta_aggregate: User_Meta_Aggregate;
  /** fetch data from the table: "user_meta" using primary key columns */
  readonly user_meta_by_pk?: Maybe<User_Meta>;
  /** An array relationship */
  readonly user_phones: ReadonlyArray<User_Phones>;
  /** An aggregate relationship */
  readonly user_phones_aggregate: User_Phones_Aggregate;
  /** fetch data from the table: "user_phones" using primary key columns */
  readonly user_phones_by_pk?: Maybe<User_Phones>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  readonly users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "verification_requests" */
  readonly verification_requests: ReadonlyArray<Verification_Requests>;
  /** fetch aggregated fields from the table: "verification_requests" */
  readonly verification_requests_aggregate: Verification_Requests_Aggregate;
  /** fetch data from the table: "verification_requests" using primary key columns */
  readonly verification_requests_by_pk?: Maybe<Verification_Requests>;
};


export type Query_RootAccountsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootCitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


export type Query_RootCities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


export type Query_RootCities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCountriesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Countries_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Countries_Order_By>>;
  where?: Maybe<Countries_Bool_Exp>;
};


export type Query_RootCountries_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Countries_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Countries_Order_By>>;
  where?: Maybe<Countries_Bool_Exp>;
};


export type Query_RootCountries_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCurrenciesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Currencies_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Currencies_Order_By>>;
  where?: Maybe<Currencies_Bool_Exp>;
};


export type Query_RootCurrencies_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Currencies_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Currencies_Order_By>>;
  where?: Maybe<Currencies_Bool_Exp>;
};


export type Query_RootCurrencies_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPayment_OfferArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


export type Query_RootPayment_Offer_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


export type Query_RootPayment_Offer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPaymentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


export type Query_RootPayments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


export type Query_RootPayments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPayoutArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


export type Query_RootPayout_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


export type Query_RootPayout_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootServiceArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


export type Query_RootService_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


export type Query_RootService_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootService_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Type_Order_By>>;
  where?: Maybe<Service_Type_Bool_Exp>;
};


export type Query_RootService_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Type_Order_By>>;
  where?: Maybe<Service_Type_Bool_Exp>;
};


export type Query_RootService_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootSessionsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootStatesArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


export type Query_RootStates_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


export type Query_RootStates_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTaskArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


export type Query_RootTask_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


export type Query_RootTask_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTransactionArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


export type Query_RootTransaction_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


export type Query_RootTransaction_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUser_Email_VerificationArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


export type Query_RootUser_Email_Verification_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


export type Query_RootUser_Email_Verification_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUser_MetaArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


export type Query_RootUser_Meta_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


export type Query_RootUser_Meta_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUser_PhonesArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};


export type Query_RootUser_Phones_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};


export type Query_RootUser_Phones_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVerification_RequestsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Verification_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Verification_Requests_Order_By>>;
  where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Query_RootVerification_Requests_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Verification_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Verification_Requests_Order_By>>;
  where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Query_RootVerification_Requests_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "service" */
export type Service = {
  readonly __typename?: 'service';
  readonly id: Scalars['uuid'];
  /** An object relationship */
  readonly service_type: Service_Type;
  /** An object relationship */
  readonly transaction: Transaction;
  readonly transaction_id: Scalars['uuid'];
  readonly type: Scalars['String'];
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "service" */
export type Service_Aggregate = {
  readonly __typename?: 'service_aggregate';
  readonly aggregate?: Maybe<Service_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Service>;
};

/** aggregate fields of "service" */
export type Service_Aggregate_Fields = {
  readonly __typename?: 'service_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Service_Max_Fields>;
  readonly min?: Maybe<Service_Min_Fields>;
};


/** aggregate fields of "service" */
export type Service_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Service_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "service" */
export type Service_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Service_Max_Order_By>;
  readonly min?: Maybe<Service_Min_Order_By>;
};

/** input type for inserting array relation for remote table "service" */
export type Service_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Service_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Service_On_Conflict>;
};

/** Boolean expression to filter rows from the table "service". All fields are combined with a logical 'AND'. */
export type Service_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Service_Bool_Exp>>;
  readonly _not?: Maybe<Service_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Service_Bool_Exp>>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly service_type?: Maybe<Service_Type_Bool_Exp>;
  readonly transaction?: Maybe<Transaction_Bool_Exp>;
  readonly transaction_id?: Maybe<Uuid_Comparison_Exp>;
  readonly type?: Maybe<String_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "service" */
export enum Service_Constraint {
  /** unique or primary key constraint */
  PkService = 'pk_service',
  /** unique or primary key constraint */
  ServiceTransactionIdKey = 'service_transaction_id_key'
}

/** input type for inserting data into table "service" */
export type Service_Insert_Input = {
  readonly id?: Maybe<Scalars['uuid']>;
  readonly service_type?: Maybe<Service_Type_Obj_Rel_Insert_Input>;
  readonly transaction?: Maybe<Transaction_Obj_Rel_Insert_Input>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Service_Max_Fields = {
  readonly __typename?: 'service_max_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "service" */
export type Service_Max_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly type?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Service_Min_Fields = {
  readonly __typename?: 'service_min_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "service" */
export type Service_Min_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly type?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "service" */
export type Service_Mutation_Response = {
  readonly __typename?: 'service_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Service>;
};

/** input type for inserting object relation for remote table "service" */
export type Service_Obj_Rel_Insert_Input = {
  readonly data: Service_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Service_On_Conflict>;
};

/** on conflict condition type for table "service" */
export type Service_On_Conflict = {
  readonly constraint: Service_Constraint;
  readonly update_columns?: ReadonlyArray<Service_Update_Column>;
  readonly where?: Maybe<Service_Bool_Exp>;
};

/** Ordering options when selecting data from "service". */
export type Service_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly service_type?: Maybe<Service_Type_Order_By>;
  readonly transaction?: Maybe<Transaction_Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly type?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: service */
export type Service_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "service" */
export enum Service_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "service" */
export type Service_Set_Input = {
  readonly id?: Maybe<Scalars['uuid']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** columns and relationships of "service_type" */
export type Service_Type = {
  readonly __typename?: 'service_type';
  readonly comment?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly services: ReadonlyArray<Service>;
  /** An aggregate relationship */
  readonly services_aggregate: Service_Aggregate;
  readonly value: Scalars['String'];
};


/** columns and relationships of "service_type" */
export type Service_TypeServicesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


/** columns and relationships of "service_type" */
export type Service_TypeServices_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};

/** aggregated selection of "service_type" */
export type Service_Type_Aggregate = {
  readonly __typename?: 'service_type_aggregate';
  readonly aggregate?: Maybe<Service_Type_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Service_Type>;
};

/** aggregate fields of "service_type" */
export type Service_Type_Aggregate_Fields = {
  readonly __typename?: 'service_type_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Service_Type_Max_Fields>;
  readonly min?: Maybe<Service_Type_Min_Fields>;
};


/** aggregate fields of "service_type" */
export type Service_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Service_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "service_type". All fields are combined with a logical 'AND'. */
export type Service_Type_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Service_Type_Bool_Exp>>;
  readonly _not?: Maybe<Service_Type_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Service_Type_Bool_Exp>>;
  readonly comment?: Maybe<String_Comparison_Exp>;
  readonly services?: Maybe<Service_Bool_Exp>;
  readonly value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "service_type" */
export enum Service_Type_Constraint {
  /** unique or primary key constraint */
  ServiceTypePkey = 'service_type_pkey'
}

/** input type for inserting data into table "service_type" */
export type Service_Type_Insert_Input = {
  readonly comment?: Maybe<Scalars['String']>;
  readonly services?: Maybe<Service_Arr_Rel_Insert_Input>;
  readonly value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Service_Type_Max_Fields = {
  readonly __typename?: 'service_type_max_fields';
  readonly comment?: Maybe<Scalars['String']>;
  readonly value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Service_Type_Min_Fields = {
  readonly __typename?: 'service_type_min_fields';
  readonly comment?: Maybe<Scalars['String']>;
  readonly value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "service_type" */
export type Service_Type_Mutation_Response = {
  readonly __typename?: 'service_type_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Service_Type>;
};

/** input type for inserting object relation for remote table "service_type" */
export type Service_Type_Obj_Rel_Insert_Input = {
  readonly data: Service_Type_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Service_Type_On_Conflict>;
};

/** on conflict condition type for table "service_type" */
export type Service_Type_On_Conflict = {
  readonly constraint: Service_Type_Constraint;
  readonly update_columns?: ReadonlyArray<Service_Type_Update_Column>;
  readonly where?: Maybe<Service_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "service_type". */
export type Service_Type_Order_By = {
  readonly comment?: Maybe<Order_By>;
  readonly services_aggregate?: Maybe<Service_Aggregate_Order_By>;
  readonly value?: Maybe<Order_By>;
};

/** primary key columns input for table: service_type */
export type Service_Type_Pk_Columns_Input = {
  readonly value: Scalars['String'];
};

/** select columns of table "service_type" */
export enum Service_Type_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "service_type" */
export type Service_Type_Set_Input = {
  readonly comment?: Maybe<Scalars['String']>;
  readonly value?: Maybe<Scalars['String']>;
};

/** update columns of table "service_type" */
export enum Service_Type_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** update columns of table "service" */
export enum Service_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "sessions" */
export type Sessions = {
  readonly __typename?: 'sessions';
  readonly access_token: Scalars['String'];
  readonly created_at: Scalars['timestamptz'];
  readonly expires: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  readonly session_token: Scalars['String'];
  readonly updated_at: Scalars['timestamptz'];
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  readonly __typename?: 'sessions_aggregate';
  readonly aggregate?: Maybe<Sessions_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Sessions>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  readonly __typename?: 'sessions_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Sessions_Max_Fields>;
  readonly min?: Maybe<Sessions_Min_Fields>;
};


/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "sessions" */
export type Sessions_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Sessions_Max_Order_By>;
  readonly min?: Maybe<Sessions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "sessions" */
export type Sessions_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Sessions_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Sessions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Sessions_Bool_Exp>>;
  readonly _not?: Maybe<Sessions_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Sessions_Bool_Exp>>;
  readonly access_token?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly expires?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly session_token?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint */
  PkSessions = 'pk_sessions'
}

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  readonly access_token?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly session_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  readonly __typename?: 'sessions_max_fields';
  readonly access_token?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly session_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "sessions" */
export type Sessions_Max_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly expires?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly session_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  readonly __typename?: 'sessions_min_fields';
  readonly access_token?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly session_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "sessions" */
export type Sessions_Min_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly expires?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly session_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  readonly __typename?: 'sessions_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Sessions>;
};

/** on conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  readonly constraint: Sessions_Constraint;
  readonly update_columns?: ReadonlyArray<Sessions_Update_Column>;
  readonly where?: Maybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  readonly access_token?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly expires?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly session_token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'session_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  readonly access_token?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly session_token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'session_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "states" */
export type States = {
  readonly __typename?: 'states';
  readonly active: Scalars['Boolean'];
  /** An array relationship */
  readonly cities: ReadonlyArray<Cities>;
  /** An aggregate relationship */
  readonly cities_aggregate: Cities_Aggregate;
  readonly code: Scalars['bpchar'];
  /** An object relationship */
  readonly country?: Maybe<Countries>;
  /** An object relationship */
  readonly countryByCountryId?: Maybe<Countries>;
  readonly country_code?: Maybe<Scalars['bpchar']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "states" */
export type StatesCitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


/** columns and relationships of "states" */
export type StatesCities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};

/** aggregated selection of "states" */
export type States_Aggregate = {
  readonly __typename?: 'states_aggregate';
  readonly aggregate?: Maybe<States_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<States>;
};

/** aggregate fields of "states" */
export type States_Aggregate_Fields = {
  readonly __typename?: 'states_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<States_Max_Fields>;
  readonly min?: Maybe<States_Min_Fields>;
};


/** aggregate fields of "states" */
export type States_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<States_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "states" */
export type States_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<States_Max_Order_By>;
  readonly min?: Maybe<States_Min_Order_By>;
};

/** input type for inserting array relation for remote table "states" */
export type States_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<States_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<States_On_Conflict>;
};

/** Boolean expression to filter rows from the table "states". All fields are combined with a logical 'AND'. */
export type States_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<States_Bool_Exp>>;
  readonly _not?: Maybe<States_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<States_Bool_Exp>>;
  readonly active?: Maybe<Boolean_Comparison_Exp>;
  readonly cities?: Maybe<Cities_Bool_Exp>;
  readonly code?: Maybe<Bpchar_Comparison_Exp>;
  readonly country?: Maybe<Countries_Bool_Exp>;
  readonly countryByCountryId?: Maybe<Countries_Bool_Exp>;
  readonly country_code?: Maybe<Bpchar_Comparison_Exp>;
  readonly country_id?: Maybe<Uuid_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "states" */
export enum States_Constraint {
  /** unique or primary key constraint */
  StatesPkey = 'states_pkey',
  /** unique or primary key constraint */
  UidxStatesCountryCode = 'uidx_states_country_code'
}

/** input type for inserting data into table "states" */
export type States_Insert_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly cities?: Maybe<Cities_Arr_Rel_Insert_Input>;
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly country?: Maybe<Countries_Obj_Rel_Insert_Input>;
  readonly countryByCountryId?: Maybe<Countries_Obj_Rel_Insert_Input>;
  readonly country_code?: Maybe<Scalars['bpchar']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type States_Max_Fields = {
  readonly __typename?: 'states_max_fields';
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly country_code?: Maybe<Scalars['bpchar']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "states" */
export type States_Max_Order_By = {
  readonly code?: Maybe<Order_By>;
  readonly country_code?: Maybe<Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type States_Min_Fields = {
  readonly __typename?: 'states_min_fields';
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly country_code?: Maybe<Scalars['bpchar']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "states" */
export type States_Min_Order_By = {
  readonly code?: Maybe<Order_By>;
  readonly country_code?: Maybe<Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "states" */
export type States_Mutation_Response = {
  readonly __typename?: 'states_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<States>;
};

/** input type for inserting object relation for remote table "states" */
export type States_Obj_Rel_Insert_Input = {
  readonly data: States_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<States_On_Conflict>;
};

/** on conflict condition type for table "states" */
export type States_On_Conflict = {
  readonly constraint: States_Constraint;
  readonly update_columns?: ReadonlyArray<States_Update_Column>;
  readonly where?: Maybe<States_Bool_Exp>;
};

/** Ordering options when selecting data from "states". */
export type States_Order_By = {
  readonly active?: Maybe<Order_By>;
  readonly cities_aggregate?: Maybe<Cities_Aggregate_Order_By>;
  readonly code?: Maybe<Order_By>;
  readonly country?: Maybe<Countries_Order_By>;
  readonly countryByCountryId?: Maybe<Countries_Order_By>;
  readonly country_code?: Maybe<Order_By>;
  readonly country_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: states */
export type States_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "states" */
export enum States_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "states" */
export type States_Set_Input = {
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly code?: Maybe<Scalars['bpchar']>;
  readonly country_code?: Maybe<Scalars['bpchar']>;
  readonly country_id?: Maybe<Scalars['uuid']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
};

/** update columns of table "states" */
export enum States_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Code = 'code',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Subscription_Root = {
  readonly __typename?: 'subscription_root';
  /** An array relationship */
  readonly accounts: ReadonlyArray<Accounts>;
  /** An aggregate relationship */
  readonly accounts_aggregate: Accounts_Aggregate;
  /** An array relationship */
  readonly cities: ReadonlyArray<Cities>;
  /** An aggregate relationship */
  readonly cities_aggregate: Cities_Aggregate;
  /** fetch data from the table: "cities" using primary key columns */
  readonly cities_by_pk?: Maybe<Cities>;
  /** fetch data from the table: "countries" */
  readonly countries: ReadonlyArray<Countries>;
  /** fetch aggregated fields from the table: "countries" */
  readonly countries_aggregate: Countries_Aggregate;
  /** fetch data from the table: "countries" using primary key columns */
  readonly countries_by_pk?: Maybe<Countries>;
  /** fetch data from the table: "currencies" */
  readonly currencies: ReadonlyArray<Currencies>;
  /** fetch aggregated fields from the table: "currencies" */
  readonly currencies_aggregate: Currencies_Aggregate;
  /** fetch data from the table: "currencies" using primary key columns */
  readonly currencies_by_pk?: Maybe<Currencies>;
  /** fetch data from the table: "payment_offer" */
  readonly payment_offer: ReadonlyArray<Payment_Offer>;
  /** fetch aggregated fields from the table: "payment_offer" */
  readonly payment_offer_aggregate: Payment_Offer_Aggregate;
  /** fetch data from the table: "payment_offer" using primary key columns */
  readonly payment_offer_by_pk?: Maybe<Payment_Offer>;
  /** An array relationship */
  readonly payments: ReadonlyArray<Payments>;
  /** An aggregate relationship */
  readonly payments_aggregate: Payments_Aggregate;
  /** fetch data from the table: "payments" using primary key columns */
  readonly payments_by_pk?: Maybe<Payments>;
  /** fetch data from the table: "payout" */
  readonly payout: ReadonlyArray<Payout>;
  /** fetch aggregated fields from the table: "payout" */
  readonly payout_aggregate: Payout_Aggregate;
  /** fetch data from the table: "payout" using primary key columns */
  readonly payout_by_pk?: Maybe<Payout>;
  /** fetch data from the table: "service" */
  readonly service: ReadonlyArray<Service>;
  /** fetch aggregated fields from the table: "service" */
  readonly service_aggregate: Service_Aggregate;
  /** fetch data from the table: "service" using primary key columns */
  readonly service_by_pk?: Maybe<Service>;
  /** fetch data from the table: "service_type" */
  readonly service_type: ReadonlyArray<Service_Type>;
  /** fetch aggregated fields from the table: "service_type" */
  readonly service_type_aggregate: Service_Type_Aggregate;
  /** fetch data from the table: "service_type" using primary key columns */
  readonly service_type_by_pk?: Maybe<Service_Type>;
  /** An array relationship */
  readonly sessions: ReadonlyArray<Sessions>;
  /** An aggregate relationship */
  readonly sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  readonly sessions_by_pk?: Maybe<Sessions>;
  /** An array relationship */
  readonly states: ReadonlyArray<States>;
  /** An aggregate relationship */
  readonly states_aggregate: States_Aggregate;
  /** fetch data from the table: "states" using primary key columns */
  readonly states_by_pk?: Maybe<States>;
  /** fetch data from the table: "task" */
  readonly task: ReadonlyArray<Task>;
  /** fetch aggregated fields from the table: "task" */
  readonly task_aggregate: Task_Aggregate;
  /** fetch data from the table: "task" using primary key columns */
  readonly task_by_pk?: Maybe<Task>;
  /** fetch data from the table: "transaction" */
  readonly transaction: ReadonlyArray<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  readonly transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  readonly transaction_by_pk?: Maybe<Transaction>;
  /** fetch data from the table: "user_email_verification" */
  readonly user_email_verification: ReadonlyArray<User_Email_Verification>;
  /** fetch aggregated fields from the table: "user_email_verification" */
  readonly user_email_verification_aggregate: User_Email_Verification_Aggregate;
  /** fetch data from the table: "user_email_verification" using primary key columns */
  readonly user_email_verification_by_pk?: Maybe<User_Email_Verification>;
  /** An array relationship */
  readonly user_meta: ReadonlyArray<User_Meta>;
  /** An aggregate relationship */
  readonly user_meta_aggregate: User_Meta_Aggregate;
  /** fetch data from the table: "user_meta" using primary key columns */
  readonly user_meta_by_pk?: Maybe<User_Meta>;
  /** An array relationship */
  readonly user_phones: ReadonlyArray<User_Phones>;
  /** An aggregate relationship */
  readonly user_phones_aggregate: User_Phones_Aggregate;
  /** fetch data from the table: "user_phones" using primary key columns */
  readonly user_phones_by_pk?: Maybe<User_Phones>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  readonly users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "verification_requests" */
  readonly verification_requests: ReadonlyArray<Verification_Requests>;
  /** fetch aggregated fields from the table: "verification_requests" */
  readonly verification_requests_aggregate: Verification_Requests_Aggregate;
  /** fetch data from the table: "verification_requests" using primary key columns */
  readonly verification_requests_by_pk?: Maybe<Verification_Requests>;
};


export type Subscription_RootAccountsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootCitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


export type Subscription_RootCities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Cities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Cities_Order_By>>;
  where?: Maybe<Cities_Bool_Exp>;
};


export type Subscription_RootCities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCountriesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Countries_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Countries_Order_By>>;
  where?: Maybe<Countries_Bool_Exp>;
};


export type Subscription_RootCountries_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Countries_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Countries_Order_By>>;
  where?: Maybe<Countries_Bool_Exp>;
};


export type Subscription_RootCountries_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCurrenciesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Currencies_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Currencies_Order_By>>;
  where?: Maybe<Currencies_Bool_Exp>;
};


export type Subscription_RootCurrencies_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Currencies_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Currencies_Order_By>>;
  where?: Maybe<Currencies_Bool_Exp>;
};


export type Subscription_RootCurrencies_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPayment_OfferArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


export type Subscription_RootPayment_Offer_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


export type Subscription_RootPayment_Offer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPaymentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


export type Subscription_RootPayments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


export type Subscription_RootPayments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPayoutArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


export type Subscription_RootPayout_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


export type Subscription_RootPayout_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootServiceArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


export type Subscription_RootService_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


export type Subscription_RootService_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootService_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Type_Order_By>>;
  where?: Maybe<Service_Type_Bool_Exp>;
};


export type Subscription_RootService_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Type_Order_By>>;
  where?: Maybe<Service_Type_Bool_Exp>;
};


export type Subscription_RootService_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootSessionsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootStatesArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


export type Subscription_RootStates_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<States_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<States_Order_By>>;
  where?: Maybe<States_Bool_Exp>;
};


export type Subscription_RootStates_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTaskArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


export type Subscription_RootTask_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


export type Subscription_RootTask_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTransactionArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


export type Subscription_RootTransaction_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


export type Subscription_RootTransaction_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_Email_VerificationArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


export type Subscription_RootUser_Email_Verification_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


export type Subscription_RootUser_Email_Verification_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_MetaArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


export type Subscription_RootUser_Meta_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


export type Subscription_RootUser_Meta_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUser_PhonesArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};


export type Subscription_RootUser_Phones_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};


export type Subscription_RootUser_Phones_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVerification_RequestsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Verification_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Verification_Requests_Order_By>>;
  where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Subscription_RootVerification_Requests_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Verification_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Verification_Requests_Order_By>>;
  where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Subscription_RootVerification_Requests_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "task" */
export type Task = {
  readonly __typename?: 'task';
  readonly created_at: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  readonly info_text: Scalars['String'];
  readonly isDone: Scalars['Boolean'];
  /** An object relationship */
  readonly transaction: Transaction;
  readonly transaction_id: Scalars['uuid'];
  readonly updated_at: Scalars['timestamptz'];
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "task" */
export type Task_Aggregate = {
  readonly __typename?: 'task_aggregate';
  readonly aggregate?: Maybe<Task_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Task>;
};

/** aggregate fields of "task" */
export type Task_Aggregate_Fields = {
  readonly __typename?: 'task_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Task_Max_Fields>;
  readonly min?: Maybe<Task_Min_Fields>;
};


/** aggregate fields of "task" */
export type Task_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Task_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "task" */
export type Task_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Task_Max_Order_By>;
  readonly min?: Maybe<Task_Min_Order_By>;
};

/** input type for inserting array relation for remote table "task" */
export type Task_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Task_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Task_On_Conflict>;
};

/** Boolean expression to filter rows from the table "task". All fields are combined with a logical 'AND'. */
export type Task_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Task_Bool_Exp>>;
  readonly _not?: Maybe<Task_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Task_Bool_Exp>>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly info_text?: Maybe<String_Comparison_Exp>;
  readonly isDone?: Maybe<Boolean_Comparison_Exp>;
  readonly transaction?: Maybe<Transaction_Bool_Exp>;
  readonly transaction_id?: Maybe<Uuid_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "task" */
export enum Task_Constraint {
  /** unique or primary key constraint */
  PkTask = 'pk_task'
}

/** input type for inserting data into table "task" */
export type Task_Insert_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly info_text?: Maybe<Scalars['String']>;
  readonly isDone?: Maybe<Scalars['Boolean']>;
  readonly transaction?: Maybe<Transaction_Obj_Rel_Insert_Input>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Task_Max_Fields = {
  readonly __typename?: 'task_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly info_text?: Maybe<Scalars['String']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "task" */
export type Task_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly info_text?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Task_Min_Fields = {
  readonly __typename?: 'task_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly info_text?: Maybe<Scalars['String']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "task" */
export type Task_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly info_text?: Maybe<Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "task" */
export type Task_Mutation_Response = {
  readonly __typename?: 'task_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Task>;
};

/** on conflict condition type for table "task" */
export type Task_On_Conflict = {
  readonly constraint: Task_Constraint;
  readonly update_columns?: ReadonlyArray<Task_Update_Column>;
  readonly where?: Maybe<Task_Bool_Exp>;
};

/** Ordering options when selecting data from "task". */
export type Task_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly info_text?: Maybe<Order_By>;
  readonly isDone?: Maybe<Order_By>;
  readonly transaction?: Maybe<Transaction_Order_By>;
  readonly transaction_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: task */
export type Task_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "task" */
export enum Task_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InfoText = 'info_text',
  /** column name */
  IsDone = 'isDone',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "task" */
export type Task_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly info_text?: Maybe<Scalars['String']>;
  readonly isDone?: Maybe<Scalars['Boolean']>;
  readonly transaction_id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "task" */
export enum Task_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InfoText = 'info_text',
  /** column name */
  IsDone = 'isDone',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['timestamp']>;
  readonly _gt?: Maybe<Scalars['timestamp']>;
  readonly _gte?: Maybe<Scalars['timestamp']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['timestamp']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['timestamp']>;
  readonly _lte?: Maybe<Scalars['timestamp']>;
  readonly _neq?: Maybe<Scalars['timestamp']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['timestamp']>>;
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['timestamptz']>;
  readonly _gt?: Maybe<Scalars['timestamptz']>;
  readonly _gte?: Maybe<Scalars['timestamptz']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['timestamptz']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['timestamptz']>;
  readonly _lte?: Maybe<Scalars['timestamptz']>;
  readonly _neq?: Maybe<Scalars['timestamptz']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['timestamptz']>>;
};

/** columns and relationships of "transaction" */
export type Transaction = {
  readonly __typename?: 'transaction';
  readonly amount: Scalars['Int'];
  readonly created_at: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  readonly is_success_done: Scalars['Boolean'];
  readonly name?: Maybe<Scalars['String']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly payment_offer_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  readonly payouts: ReadonlyArray<Payout>;
  /** An aggregate relationship */
  readonly payouts_aggregate: Payout_Aggregate;
  /** An object relationship */
  readonly service?: Maybe<Service>;
  readonly service_type?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly tasks: ReadonlyArray<Task>;
  /** An aggregate relationship */
  readonly tasks_aggregate: Task_Aggregate;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "transaction" */
export type TransactionPayoutsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


/** columns and relationships of "transaction" */
export type TransactionPayouts_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payout_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payout_Order_By>>;
  where?: Maybe<Payout_Bool_Exp>;
};


/** columns and relationships of "transaction" */
export type TransactionTasksArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


/** columns and relationships of "transaction" */
export type TransactionTasks_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};

/** aggregated selection of "transaction" */
export type Transaction_Aggregate = {
  readonly __typename?: 'transaction_aggregate';
  readonly aggregate?: Maybe<Transaction_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Transaction>;
};

/** aggregate fields of "transaction" */
export type Transaction_Aggregate_Fields = {
  readonly __typename?: 'transaction_aggregate_fields';
  readonly avg?: Maybe<Transaction_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Transaction_Max_Fields>;
  readonly min?: Maybe<Transaction_Min_Fields>;
  readonly stddev?: Maybe<Transaction_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Transaction_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Transaction_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Transaction_Sum_Fields>;
  readonly var_pop?: Maybe<Transaction_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Transaction_Var_Samp_Fields>;
  readonly variance?: Maybe<Transaction_Variance_Fields>;
};


/** aggregate fields of "transaction" */
export type Transaction_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "transaction" */
export type Transaction_Aggregate_Order_By = {
  readonly avg?: Maybe<Transaction_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Transaction_Max_Order_By>;
  readonly min?: Maybe<Transaction_Min_Order_By>;
  readonly stddev?: Maybe<Transaction_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Transaction_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Transaction_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Transaction_Sum_Order_By>;
  readonly var_pop?: Maybe<Transaction_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Transaction_Var_Samp_Order_By>;
  readonly variance?: Maybe<Transaction_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transaction" */
export type Transaction_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Transaction_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Transaction_On_Conflict>;
};

/** aggregate avg on columns */
export type Transaction_Avg_Fields = {
  readonly __typename?: 'transaction_avg_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transaction" */
export type Transaction_Avg_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transaction". All fields are combined with a logical 'AND'. */
export type Transaction_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Transaction_Bool_Exp>>;
  readonly _not?: Maybe<Transaction_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Transaction_Bool_Exp>>;
  readonly amount?: Maybe<Int_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly is_success_done?: Maybe<Boolean_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly payment_id?: Maybe<Uuid_Comparison_Exp>;
  readonly payment_offer_id?: Maybe<Uuid_Comparison_Exp>;
  readonly payouts?: Maybe<Payout_Bool_Exp>;
  readonly service?: Maybe<Service_Bool_Exp>;
  readonly service_type?: Maybe<String_Comparison_Exp>;
  readonly tasks?: Maybe<Task_Bool_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "transaction" */
export enum Transaction_Constraint {
  /** unique or primary key constraint */
  PkTransaction = 'pk_transaction'
}

/** input type for incrementing numeric columns in table "transaction" */
export type Transaction_Inc_Input = {
  readonly amount?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "transaction" */
export type Transaction_Insert_Input = {
  readonly amount?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly is_success_done?: Maybe<Scalars['Boolean']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly payment_offer_id?: Maybe<Scalars['uuid']>;
  readonly payouts?: Maybe<Payout_Arr_Rel_Insert_Input>;
  readonly service?: Maybe<Service_Obj_Rel_Insert_Input>;
  readonly service_type?: Maybe<Scalars['String']>;
  readonly tasks?: Maybe<Task_Arr_Rel_Insert_Input>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Transaction_Max_Fields = {
  readonly __typename?: 'transaction_max_fields';
  readonly amount?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly payment_offer_id?: Maybe<Scalars['uuid']>;
  readonly service_type?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "transaction" */
export type Transaction_Max_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly payment_offer_id?: Maybe<Order_By>;
  readonly service_type?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Transaction_Min_Fields = {
  readonly __typename?: 'transaction_min_fields';
  readonly amount?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly payment_offer_id?: Maybe<Scalars['uuid']>;
  readonly service_type?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "transaction" */
export type Transaction_Min_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly payment_offer_id?: Maybe<Order_By>;
  readonly service_type?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "transaction" */
export type Transaction_Mutation_Response = {
  readonly __typename?: 'transaction_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Transaction>;
};

/** input type for inserting object relation for remote table "transaction" */
export type Transaction_Obj_Rel_Insert_Input = {
  readonly data: Transaction_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Transaction_On_Conflict>;
};

/** on conflict condition type for table "transaction" */
export type Transaction_On_Conflict = {
  readonly constraint: Transaction_Constraint;
  readonly update_columns?: ReadonlyArray<Transaction_Update_Column>;
  readonly where?: Maybe<Transaction_Bool_Exp>;
};

/** Ordering options when selecting data from "transaction". */
export type Transaction_Order_By = {
  readonly amount?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly is_success_done?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly payment_id?: Maybe<Order_By>;
  readonly payment_offer_id?: Maybe<Order_By>;
  readonly payouts_aggregate?: Maybe<Payout_Aggregate_Order_By>;
  readonly service?: Maybe<Service_Order_By>;
  readonly service_type?: Maybe<Order_By>;
  readonly tasks_aggregate?: Maybe<Task_Aggregate_Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: transaction */
export type Transaction_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "transaction" */
export enum Transaction_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsSuccessDone = 'is_success_done',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  PaymentOfferId = 'payment_offer_id',
  /** column name */
  ServiceType = 'service_type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "transaction" */
export type Transaction_Set_Input = {
  readonly amount?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly is_success_done?: Maybe<Scalars['Boolean']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly payment_id?: Maybe<Scalars['uuid']>;
  readonly payment_offer_id?: Maybe<Scalars['uuid']>;
  readonly service_type?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Transaction_Stddev_Fields = {
  readonly __typename?: 'transaction_stddev_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "transaction" */
export type Transaction_Stddev_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transaction_Stddev_Pop_Fields = {
  readonly __typename?: 'transaction_stddev_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transaction" */
export type Transaction_Stddev_Pop_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transaction_Stddev_Samp_Fields = {
  readonly __typename?: 'transaction_stddev_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transaction" */
export type Transaction_Stddev_Samp_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Transaction_Sum_Fields = {
  readonly __typename?: 'transaction_sum_fields';
  readonly amount?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "transaction" */
export type Transaction_Sum_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** update columns of table "transaction" */
export enum Transaction_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsSuccessDone = 'is_success_done',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentId = 'payment_id',
  /** column name */
  PaymentOfferId = 'payment_offer_id',
  /** column name */
  ServiceType = 'service_type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Transaction_Var_Pop_Fields = {
  readonly __typename?: 'transaction_var_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "transaction" */
export type Transaction_Var_Pop_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transaction_Var_Samp_Fields = {
  readonly __typename?: 'transaction_var_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transaction" */
export type Transaction_Var_Samp_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Transaction_Variance_Fields = {
  readonly __typename?: 'transaction_variance_fields';
  readonly amount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transaction" */
export type Transaction_Variance_Order_By = {
  readonly amount?: Maybe<Order_By>;
};

/** columns and relationships of "user_email_verification" */
export type User_Email_Verification = {
  readonly __typename?: 'user_email_verification';
  readonly code: Scalars['String'];
  readonly code_use_date?: Maybe<Scalars['timestamp']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "user_email_verification" */
export type User_Email_Verification_Aggregate = {
  readonly __typename?: 'user_email_verification_aggregate';
  readonly aggregate?: Maybe<User_Email_Verification_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<User_Email_Verification>;
};

/** aggregate fields of "user_email_verification" */
export type User_Email_Verification_Aggregate_Fields = {
  readonly __typename?: 'user_email_verification_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<User_Email_Verification_Max_Fields>;
  readonly min?: Maybe<User_Email_Verification_Min_Fields>;
};


/** aggregate fields of "user_email_verification" */
export type User_Email_Verification_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_email_verification" */
export type User_Email_Verification_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<User_Email_Verification_Max_Order_By>;
  readonly min?: Maybe<User_Email_Verification_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_email_verification" */
export type User_Email_Verification_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<User_Email_Verification_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<User_Email_Verification_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_email_verification". All fields are combined with a logical 'AND'. */
export type User_Email_Verification_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<User_Email_Verification_Bool_Exp>>;
  readonly _not?: Maybe<User_Email_Verification_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<User_Email_Verification_Bool_Exp>>;
  readonly code?: Maybe<String_Comparison_Exp>;
  readonly code_use_date?: Maybe<Timestamp_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_email_verification" */
export enum User_Email_Verification_Constraint {
  /** unique or primary key constraint */
  PkUserEmailVerification = 'pk_user_email_verification',
  /** unique or primary key constraint */
  UidxUserEmailVerificationCode = 'uidx_user_email_verification_code'
}

/** input type for inserting data into table "user_email_verification" */
export type User_Email_Verification_Insert_Input = {
  readonly code?: Maybe<Scalars['String']>;
  readonly code_use_date?: Maybe<Scalars['timestamp']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Email_Verification_Max_Fields = {
  readonly __typename?: 'user_email_verification_max_fields';
  readonly code?: Maybe<Scalars['String']>;
  readonly code_use_date?: Maybe<Scalars['timestamp']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user_email_verification" */
export type User_Email_Verification_Max_Order_By = {
  readonly code?: Maybe<Order_By>;
  readonly code_use_date?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Email_Verification_Min_Fields = {
  readonly __typename?: 'user_email_verification_min_fields';
  readonly code?: Maybe<Scalars['String']>;
  readonly code_use_date?: Maybe<Scalars['timestamp']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user_email_verification" */
export type User_Email_Verification_Min_Order_By = {
  readonly code?: Maybe<Order_By>;
  readonly code_use_date?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_email_verification" */
export type User_Email_Verification_Mutation_Response = {
  readonly __typename?: 'user_email_verification_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<User_Email_Verification>;
};

/** on conflict condition type for table "user_email_verification" */
export type User_Email_Verification_On_Conflict = {
  readonly constraint: User_Email_Verification_Constraint;
  readonly update_columns?: ReadonlyArray<User_Email_Verification_Update_Column>;
  readonly where?: Maybe<User_Email_Verification_Bool_Exp>;
};

/** Ordering options when selecting data from "user_email_verification". */
export type User_Email_Verification_Order_By = {
  readonly code?: Maybe<Order_By>;
  readonly code_use_date?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: user_email_verification */
export type User_Email_Verification_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "user_email_verification" */
export enum User_Email_Verification_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CodeUseDate = 'code_use_date',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_email_verification" */
export type User_Email_Verification_Set_Input = {
  readonly code?: Maybe<Scalars['String']>;
  readonly code_use_date?: Maybe<Scalars['timestamp']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "user_email_verification" */
export enum User_Email_Verification_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CodeUseDate = 'code_use_date',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "user_meta" */
export type User_Meta = {
  readonly __typename?: 'user_meta';
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly first_name: Scalars['String'];
  readonly id: Scalars['uuid'];
  readonly last_name?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "user_meta" */
export type User_Meta_Aggregate = {
  readonly __typename?: 'user_meta_aggregate';
  readonly aggregate?: Maybe<User_Meta_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<User_Meta>;
};

/** aggregate fields of "user_meta" */
export type User_Meta_Aggregate_Fields = {
  readonly __typename?: 'user_meta_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<User_Meta_Max_Fields>;
  readonly min?: Maybe<User_Meta_Min_Fields>;
};


/** aggregate fields of "user_meta" */
export type User_Meta_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_meta" */
export type User_Meta_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<User_Meta_Max_Order_By>;
  readonly min?: Maybe<User_Meta_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_meta" */
export type User_Meta_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<User_Meta_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<User_Meta_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_meta". All fields are combined with a logical 'AND'. */
export type User_Meta_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<User_Meta_Bool_Exp>>;
  readonly _not?: Maybe<User_Meta_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<User_Meta_Bool_Exp>>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly first_name?: Maybe<String_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly last_name?: Maybe<String_Comparison_Exp>;
  readonly title?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_meta" */
export enum User_Meta_Constraint {
  /** unique or primary key constraint */
  PkUserMeta = 'pk_user_meta'
}

/** input type for inserting data into table "user_meta" */
export type User_Meta_Insert_Input = {
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly first_name?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly last_name?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Meta_Max_Fields = {
  readonly __typename?: 'user_meta_max_fields';
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly first_name?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly last_name?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user_meta" */
export type User_Meta_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly first_name?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly last_name?: Maybe<Order_By>;
  readonly title?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Meta_Min_Fields = {
  readonly __typename?: 'user_meta_min_fields';
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly first_name?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly last_name?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user_meta" */
export type User_Meta_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly first_name?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly last_name?: Maybe<Order_By>;
  readonly title?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_meta" */
export type User_Meta_Mutation_Response = {
  readonly __typename?: 'user_meta_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<User_Meta>;
};

/** on conflict condition type for table "user_meta" */
export type User_Meta_On_Conflict = {
  readonly constraint: User_Meta_Constraint;
  readonly update_columns?: ReadonlyArray<User_Meta_Update_Column>;
  readonly where?: Maybe<User_Meta_Bool_Exp>;
};

/** Ordering options when selecting data from "user_meta". */
export type User_Meta_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly first_name?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly last_name?: Maybe<Order_By>;
  readonly title?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: user_meta */
export type User_Meta_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "user_meta" */
export enum User_Meta_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_meta" */
export type User_Meta_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly first_name?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly last_name?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "user_meta" */
export enum User_Meta_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "user_phones" */
export type User_Phones = {
  readonly __typename?: 'user_phones';
  /** This shows if the phone number is still an active one */
  readonly active: Scalars['Boolean'];
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id: Scalars['uuid'];
  readonly phone_number: Scalars['String'];
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  readonly user?: Maybe<Users>;
  readonly user_id?: Maybe<Scalars['uuid']>;
  readonly verification_code: Scalars['Int'];
  readonly verification_code_use_date?: Maybe<Scalars['timestamp']>;
  readonly verification_code_validity?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "user_phones" */
export type User_Phones_Aggregate = {
  readonly __typename?: 'user_phones_aggregate';
  readonly aggregate?: Maybe<User_Phones_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<User_Phones>;
};

/** aggregate fields of "user_phones" */
export type User_Phones_Aggregate_Fields = {
  readonly __typename?: 'user_phones_aggregate_fields';
  readonly avg?: Maybe<User_Phones_Avg_Fields>;
  readonly count: Scalars['Int'];
  readonly max?: Maybe<User_Phones_Max_Fields>;
  readonly min?: Maybe<User_Phones_Min_Fields>;
  readonly stddev?: Maybe<User_Phones_Stddev_Fields>;
  readonly stddev_pop?: Maybe<User_Phones_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<User_Phones_Stddev_Samp_Fields>;
  readonly sum?: Maybe<User_Phones_Sum_Fields>;
  readonly var_pop?: Maybe<User_Phones_Var_Pop_Fields>;
  readonly var_samp?: Maybe<User_Phones_Var_Samp_Fields>;
  readonly variance?: Maybe<User_Phones_Variance_Fields>;
};


/** aggregate fields of "user_phones" */
export type User_Phones_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_phones" */
export type User_Phones_Aggregate_Order_By = {
  readonly avg?: Maybe<User_Phones_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<User_Phones_Max_Order_By>;
  readonly min?: Maybe<User_Phones_Min_Order_By>;
  readonly stddev?: Maybe<User_Phones_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<User_Phones_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<User_Phones_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<User_Phones_Sum_Order_By>;
  readonly var_pop?: Maybe<User_Phones_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<User_Phones_Var_Samp_Order_By>;
  readonly variance?: Maybe<User_Phones_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_phones" */
export type User_Phones_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<User_Phones_Insert_Input>;
  /** on conflict condition */
  readonly on_conflict?: Maybe<User_Phones_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Phones_Avg_Fields = {
  readonly __typename?: 'user_phones_avg_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_phones" */
export type User_Phones_Avg_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_phones". All fields are combined with a logical 'AND'. */
export type User_Phones_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<User_Phones_Bool_Exp>>;
  readonly _not?: Maybe<User_Phones_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<User_Phones_Bool_Exp>>;
  readonly active?: Maybe<Boolean_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly phone_number?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<Uuid_Comparison_Exp>;
  readonly verification_code?: Maybe<Int_Comparison_Exp>;
  readonly verification_code_use_date?: Maybe<Timestamp_Comparison_Exp>;
  readonly verification_code_validity?: Maybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_phones" */
export enum User_Phones_Constraint {
  /** unique or primary key constraint */
  UserPhonesPkey = 'user_phones_pkey'
}

/** input type for incrementing numeric columns in table "user_phones" */
export type User_Phones_Inc_Input = {
  readonly verification_code?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_phones" */
export type User_Phones_Insert_Input = {
  /** This shows if the phone number is still an active one */
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly phone_number?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['uuid']>;
  readonly verification_code?: Maybe<Scalars['Int']>;
  readonly verification_code_use_date?: Maybe<Scalars['timestamp']>;
  readonly verification_code_validity?: Maybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type User_Phones_Max_Fields = {
  readonly __typename?: 'user_phones_max_fields';
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly phone_number?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
  readonly verification_code?: Maybe<Scalars['Int']>;
  readonly verification_code_use_date?: Maybe<Scalars['timestamp']>;
  readonly verification_code_validity?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "user_phones" */
export type User_Phones_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly phone_number?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
  readonly verification_code?: Maybe<Order_By>;
  readonly verification_code_use_date?: Maybe<Order_By>;
  readonly verification_code_validity?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Phones_Min_Fields = {
  readonly __typename?: 'user_phones_min_fields';
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly phone_number?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
  readonly verification_code?: Maybe<Scalars['Int']>;
  readonly verification_code_use_date?: Maybe<Scalars['timestamp']>;
  readonly verification_code_validity?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "user_phones" */
export type User_Phones_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly phone_number?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
  readonly verification_code?: Maybe<Order_By>;
  readonly verification_code_use_date?: Maybe<Order_By>;
  readonly verification_code_validity?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_phones" */
export type User_Phones_Mutation_Response = {
  readonly __typename?: 'user_phones_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<User_Phones>;
};

/** on conflict condition type for table "user_phones" */
export type User_Phones_On_Conflict = {
  readonly constraint: User_Phones_Constraint;
  readonly update_columns?: ReadonlyArray<User_Phones_Update_Column>;
  readonly where?: Maybe<User_Phones_Bool_Exp>;
};

/** Ordering options when selecting data from "user_phones". */
export type User_Phones_Order_By = {
  readonly active?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly phone_number?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
  readonly verification_code?: Maybe<Order_By>;
  readonly verification_code_use_date?: Maybe<Order_By>;
  readonly verification_code_validity?: Maybe<Order_By>;
};

/** primary key columns input for table: user_phones */
export type User_Phones_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "user_phones" */
export enum User_Phones_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VerificationCode = 'verification_code',
  /** column name */
  VerificationCodeUseDate = 'verification_code_use_date',
  /** column name */
  VerificationCodeValidity = 'verification_code_validity'
}

/** input type for updating data in table "user_phones" */
export type User_Phones_Set_Input = {
  /** This shows if the phone number is still an active one */
  readonly active?: Maybe<Scalars['Boolean']>;
  readonly created_at?: Maybe<Scalars['timestamp']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly phone_number?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['uuid']>;
  readonly verification_code?: Maybe<Scalars['Int']>;
  readonly verification_code_use_date?: Maybe<Scalars['timestamp']>;
  readonly verification_code_validity?: Maybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type User_Phones_Stddev_Fields = {
  readonly __typename?: 'user_phones_stddev_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_phones" */
export type User_Phones_Stddev_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Phones_Stddev_Pop_Fields = {
  readonly __typename?: 'user_phones_stddev_pop_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_phones" */
export type User_Phones_Stddev_Pop_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Phones_Stddev_Samp_Fields = {
  readonly __typename?: 'user_phones_stddev_samp_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_phones" */
export type User_Phones_Stddev_Samp_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Phones_Sum_Fields = {
  readonly __typename?: 'user_phones_sum_fields';
  readonly verification_code?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_phones" */
export type User_Phones_Sum_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** update columns of table "user_phones" */
export enum User_Phones_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VerificationCode = 'verification_code',
  /** column name */
  VerificationCodeUseDate = 'verification_code_use_date',
  /** column name */
  VerificationCodeValidity = 'verification_code_validity'
}

/** aggregate var_pop on columns */
export type User_Phones_Var_Pop_Fields = {
  readonly __typename?: 'user_phones_var_pop_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_phones" */
export type User_Phones_Var_Pop_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Phones_Var_Samp_Fields = {
  readonly __typename?: 'user_phones_var_samp_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_phones" */
export type User_Phones_Var_Samp_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Phones_Variance_Fields = {
  readonly __typename?: 'user_phones_variance_fields';
  readonly verification_code?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_phones" */
export type User_Phones_Variance_Order_By = {
  readonly verification_code?: Maybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  readonly __typename?: 'users';
  /** An array relationship */
  readonly accounts: ReadonlyArray<Accounts>;
  /** An aggregate relationship */
  readonly accounts_aggregate: Accounts_Aggregate;
  readonly created_at: Scalars['timestamptz'];
  readonly display_name?: Maybe<Scalars['String']>;
  readonly email: Scalars['String'];
  readonly email_verified?: Maybe<Scalars['Boolean']>;
  readonly firebase_id?: Maybe<Scalars['String']>;
  readonly id: Scalars['uuid'];
  readonly image_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly payment_offers: ReadonlyArray<Payment_Offer>;
  /** An aggregate relationship */
  readonly payment_offers_aggregate: Payment_Offer_Aggregate;
  /** An array relationship */
  readonly payments: ReadonlyArray<Payments>;
  /** An aggregate relationship */
  readonly payments_aggregate: Payments_Aggregate;
  readonly phone?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly services: ReadonlyArray<Service>;
  /** An aggregate relationship */
  readonly services_aggregate: Service_Aggregate;
  /** An array relationship */
  readonly sessions: ReadonlyArray<Sessions>;
  /** An aggregate relationship */
  readonly sessions_aggregate: Sessions_Aggregate;
  /** An array relationship */
  readonly tasks: ReadonlyArray<Task>;
  /** An aggregate relationship */
  readonly tasks_aggregate: Task_Aggregate;
  /** An array relationship */
  readonly transactions: ReadonlyArray<Transaction>;
  /** An aggregate relationship */
  readonly transactions_aggregate: Transaction_Aggregate;
  readonly updated_at: Scalars['timestamptz'];
  /** An array relationship */
  readonly user_email_verifications: ReadonlyArray<User_Email_Verification>;
  /** An aggregate relationship */
  readonly user_email_verifications_aggregate: User_Email_Verification_Aggregate;
  /** An array relationship */
  readonly user_meta: ReadonlyArray<User_Meta>;
  /** An aggregate relationship */
  readonly user_meta_aggregate: User_Meta_Aggregate;
  /** An array relationship */
  readonly user_phones: ReadonlyArray<User_Phones>;
  /** An aggregate relationship */
  readonly user_phones_aggregate: User_Phones_Aggregate;
};


/** columns and relationships of "users" */
export type UsersAccountsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersAccounts_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPayment_OffersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPayment_Offers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payment_Offer_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payment_Offer_Order_By>>;
  where?: Maybe<Payment_Offer_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPaymentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPayments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Payments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Payments_Order_By>>;
  where?: Maybe<Payments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersServicesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersServices_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Service_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Service_Order_By>>;
  where?: Maybe<Service_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSessionsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSessions_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Sessions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Sessions_Order_By>>;
  where?: Maybe<Sessions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTasksArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTasks_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Task_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Task_Order_By>>;
  where?: Maybe<Task_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTransactionsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTransactions_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Email_VerificationsArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Email_Verifications_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Email_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Email_Verification_Order_By>>;
  where?: Maybe<User_Email_Verification_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_MetaArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Meta_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Meta_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Meta_Order_By>>;
  where?: Maybe<User_Meta_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_PhonesArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Phones_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Phones_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Phones_Order_By>>;
  where?: Maybe<User_Phones_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  readonly __typename?: 'users_aggregate';
  readonly aggregate?: Maybe<Users_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  readonly __typename?: 'users_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Users_Max_Fields>;
  readonly min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Users_Bool_Exp>>;
  readonly _not?: Maybe<Users_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Users_Bool_Exp>>;
  readonly accounts?: Maybe<Accounts_Bool_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly display_name?: Maybe<String_Comparison_Exp>;
  readonly email?: Maybe<String_Comparison_Exp>;
  readonly email_verified?: Maybe<Boolean_Comparison_Exp>;
  readonly firebase_id?: Maybe<String_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly image_url?: Maybe<String_Comparison_Exp>;
  readonly payment_offers?: Maybe<Payment_Offer_Bool_Exp>;
  readonly payments?: Maybe<Payments_Bool_Exp>;
  readonly phone?: Maybe<String_Comparison_Exp>;
  readonly services?: Maybe<Service_Bool_Exp>;
  readonly sessions?: Maybe<Sessions_Bool_Exp>;
  readonly tasks?: Maybe<Task_Bool_Exp>;
  readonly transactions?: Maybe<Transaction_Bool_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user_email_verifications?: Maybe<User_Email_Verification_Bool_Exp>;
  readonly user_meta?: Maybe<User_Meta_Bool_Exp>;
  readonly user_phones?: Maybe<User_Phones_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  PkUsers = 'pk_users',
  /** unique or primary key constraint */
  UserFirebaseIdKey = 'user_firebase_id_key',
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  readonly accounts?: Maybe<Accounts_Arr_Rel_Insert_Input>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly display_name?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly email_verified?: Maybe<Scalars['Boolean']>;
  readonly firebase_id?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image_url?: Maybe<Scalars['String']>;
  readonly payment_offers?: Maybe<Payment_Offer_Arr_Rel_Insert_Input>;
  readonly payments?: Maybe<Payments_Arr_Rel_Insert_Input>;
  readonly phone?: Maybe<Scalars['String']>;
  readonly services?: Maybe<Service_Arr_Rel_Insert_Input>;
  readonly sessions?: Maybe<Sessions_Arr_Rel_Insert_Input>;
  readonly tasks?: Maybe<Task_Arr_Rel_Insert_Input>;
  readonly transactions?: Maybe<Transaction_Arr_Rel_Insert_Input>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_email_verifications?: Maybe<User_Email_Verification_Arr_Rel_Insert_Input>;
  readonly user_meta?: Maybe<User_Meta_Arr_Rel_Insert_Input>;
  readonly user_phones?: Maybe<User_Phones_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  readonly __typename?: 'users_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly display_name?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly firebase_id?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image_url?: Maybe<Scalars['String']>;
  readonly phone?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  readonly __typename?: 'users_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly display_name?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly firebase_id?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image_url?: Maybe<Scalars['String']>;
  readonly phone?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  readonly __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  readonly data: Users_Insert_Input;
  /** on conflict condition */
  readonly on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  readonly constraint: Users_Constraint;
  readonly update_columns?: ReadonlyArray<Users_Update_Column>;
  readonly where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  readonly accounts_aggregate?: Maybe<Accounts_Aggregate_Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly display_name?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly email_verified?: Maybe<Order_By>;
  readonly firebase_id?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly image_url?: Maybe<Order_By>;
  readonly payment_offers_aggregate?: Maybe<Payment_Offer_Aggregate_Order_By>;
  readonly payments_aggregate?: Maybe<Payments_Aggregate_Order_By>;
  readonly phone?: Maybe<Order_By>;
  readonly services_aggregate?: Maybe<Service_Aggregate_Order_By>;
  readonly sessions_aggregate?: Maybe<Sessions_Aggregate_Order_By>;
  readonly tasks_aggregate?: Maybe<Task_Aggregate_Order_By>;
  readonly transactions_aggregate?: Maybe<Transaction_Aggregate_Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_email_verifications_aggregate?: Maybe<User_Email_Verification_Aggregate_Order_By>;
  readonly user_meta_aggregate?: Maybe<User_Meta_Aggregate_Order_By>;
  readonly user_phones_aggregate?: Maybe<User_Phones_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  FirebaseId = 'firebase_id',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly display_name?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly email_verified?: Maybe<Scalars['Boolean']>;
  readonly firebase_id?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image_url?: Maybe<Scalars['String']>;
  readonly phone?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  FirebaseId = 'firebase_id',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at'
}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['uuid']>;
  readonly _gt?: Maybe<Scalars['uuid']>;
  readonly _gte?: Maybe<Scalars['uuid']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['uuid']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['uuid']>;
  readonly _lte?: Maybe<Scalars['uuid']>;
  readonly _neq?: Maybe<Scalars['uuid']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['uuid']>>;
};

/** columns and relationships of "verification_requests" */
export type Verification_Requests = {
  readonly __typename?: 'verification_requests';
  readonly created_at: Scalars['timestamptz'];
  readonly expires: Scalars['timestamptz'];
  readonly id: Scalars['uuid'];
  readonly identifier: Scalars['String'];
  readonly token: Scalars['String'];
  readonly updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "verification_requests" */
export type Verification_Requests_Aggregate = {
  readonly __typename?: 'verification_requests_aggregate';
  readonly aggregate?: Maybe<Verification_Requests_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Verification_Requests>;
};

/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_Fields = {
  readonly __typename?: 'verification_requests_aggregate_fields';
  readonly count: Scalars['Int'];
  readonly max?: Maybe<Verification_Requests_Max_Fields>;
  readonly min?: Maybe<Verification_Requests_Min_Fields>;
};


/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Verification_Requests_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "verification_requests". All fields are combined with a logical 'AND'. */
export type Verification_Requests_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Verification_Requests_Bool_Exp>>;
  readonly _not?: Maybe<Verification_Requests_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Verification_Requests_Bool_Exp>>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly expires?: Maybe<Timestamptz_Comparison_Exp>;
  readonly id?: Maybe<Uuid_Comparison_Exp>;
  readonly identifier?: Maybe<String_Comparison_Exp>;
  readonly token?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "verification_requests" */
export enum Verification_Requests_Constraint {
  /** unique or primary key constraint */
  VerificationRequestsPkey = 'verification_requests_pkey'
}

/** input type for inserting data into table "verification_requests" */
export type Verification_Requests_Insert_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly identifier?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Verification_Requests_Max_Fields = {
  readonly __typename?: 'verification_requests_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly identifier?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Verification_Requests_Min_Fields = {
  readonly __typename?: 'verification_requests_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly identifier?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "verification_requests" */
export type Verification_Requests_Mutation_Response = {
  readonly __typename?: 'verification_requests_mutation_response';
  /** number of rows affected by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  readonly returning: ReadonlyArray<Verification_Requests>;
};

/** on conflict condition type for table "verification_requests" */
export type Verification_Requests_On_Conflict = {
  readonly constraint: Verification_Requests_Constraint;
  readonly update_columns?: ReadonlyArray<Verification_Requests_Update_Column>;
  readonly where?: Maybe<Verification_Requests_Bool_Exp>;
};

/** Ordering options when selecting data from "verification_requests". */
export type Verification_Requests_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly expires?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly identifier?: Maybe<Order_By>;
  readonly token?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: verification_requests */
export type Verification_Requests_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "verification_requests" */
export enum Verification_Requests_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "verification_requests" */
export type Verification_Requests_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly expires?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly identifier?: Maybe<Scalars['String']>;
  readonly token?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "verification_requests" */
export enum Verification_Requests_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type InsertNewUserMutationVariables = Exact<{
  id: Scalars['uuid'];
  email: Scalars['String'];
  email_verified?: Maybe<Scalars['Boolean']>;
  image_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  firebase_id: Scalars['String'];
}>;


export type InsertNewUserMutation = (
  { readonly __typename?: 'mutation_root' }
  & { readonly insert_users_one?: Maybe<(
    { readonly __typename?: 'users' }
    & Pick<Users, 'created_at' | 'email' | 'email_verified' | 'id' | 'image_url' | 'phone' | 'firebase_id'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String'];
  displayName: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { readonly __typename?: 'mutation_root' }
  & { readonly update_users?: Maybe<(
    { readonly __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetUserTransactionsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserTransactionsQuery = (
  { readonly __typename?: 'query_root' }
  & { readonly transaction: ReadonlyArray<(
    { readonly __typename?: 'transaction' }
    & Pick<Transaction, 'amount' | 'created_at' | 'id' | 'is_success_done' | 'name'>
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetCurrentUserQuery = (
  { readonly __typename?: 'query_root' }
  & { readonly users_by_pk?: Maybe<(
    { readonly __typename?: 'users' }
    & Pick<Users, 'display_name' | 'email' | 'email_verified' | 'id' | 'image_url' | 'phone'>
  )> }
);

export type GetCurrentUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetCurrentUserByEmailQuery = (
  { readonly __typename?: 'query_root' }
  & { readonly users: ReadonlyArray<(
    { readonly __typename?: 'users' }
    & Pick<Users, 'display_name' | 'email' | 'email_verified' | 'firebase_id' | 'id' | 'image_url' | 'phone'>
  )> }
);


export const InsertNewUserDocument = gql`
    mutation insertNewUser($id: uuid!, $email: String!, $email_verified: Boolean, $image_url: String, $display_name: String, $phone: String, $firebase_id: String!) {
  insert_users_one(
    object: {id: $id, email: $email, email_verified: $email_verified, image_url: $image_url, display_name: $display_name, phone: $phone, firebase_id: $firebase_id}
    on_conflict: {constraint: users_email_key}
  ) {
    created_at
    email
    email_verified
    id
    image_url
    phone
    firebase_id
  }
}
    `;
export type InsertNewUserMutationFn = Apollo.MutationFunction<InsertNewUserMutation, InsertNewUserMutationVariables>;

/**
 * __useInsertNewUserMutation__
 *
 * To run a mutation, you first call `useInsertNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNewUserMutation, { data, loading, error }] = useInsertNewUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      email_verified: // value for 'email_verified'
 *      image_url: // value for 'image_url'
 *      display_name: // value for 'display_name'
 *      phone: // value for 'phone'
 *      firebase_id: // value for 'firebase_id'
 *   },
 * });
 */
export function useInsertNewUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertNewUserMutation, InsertNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertNewUserMutation, InsertNewUserMutationVariables>(InsertNewUserDocument, options);
      }
export type InsertNewUserMutationHookResult = ReturnType<typeof useInsertNewUserMutation>;
export type InsertNewUserMutationResult = Apollo.MutationResult<InsertNewUserMutation>;
export type InsertNewUserMutationOptions = Apollo.BaseMutationOptions<InsertNewUserMutation, InsertNewUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($email: String!, $displayName: String!, $photoURL: String, $phone: String) {
  update_users(
    where: {email: {_eq: $email}}
    _set: {display_name: $displayName, image_url: $photoURL, phone: $phone}
  ) {
    affected_rows
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      displayName: // value for 'displayName'
 *      photoURL: // value for 'photoURL'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUserTransactionsDocument = gql`
    query getUserTransactions($id: uuid!) {
  transaction(
    where: {user_id: {_eq: $id}}
    order_by: {is_success_done: asc, updated_at: desc}
  ) {
    amount
    created_at
    id
    is_success_done
    name
  }
}
    `;

/**
 * __useGetUserTransactionsQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, options);
      }
export function useGetUserTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, options);
        }
export type GetUserTransactionsQueryHookResult = ReturnType<typeof useGetUserTransactionsQuery>;
export type GetUserTransactionsLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsLazyQuery>;
export type GetUserTransactionsQueryResult = Apollo.QueryResult<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser($id: uuid!) {
  users_by_pk(id: $id) {
    display_name
    email
    email_verified
    id
    image_url
    phone
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetCurrentUserByEmailDocument = gql`
    query getCurrentUserByEmail($email: String!) {
  users(where: {email: {_eq: $email}}) {
    display_name
    email
    email_verified
    firebase_id
    id
    image_url
    phone
    image_url
  }
}
    `;

/**
 * __useGetCurrentUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetCurrentUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserByEmailQuery, GetCurrentUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserByEmailQuery, GetCurrentUserByEmailQueryVariables>(GetCurrentUserByEmailDocument, options);
      }
export function useGetCurrentUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserByEmailQuery, GetCurrentUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserByEmailQuery, GetCurrentUserByEmailQueryVariables>(GetCurrentUserByEmailDocument, options);
        }
export type GetCurrentUserByEmailQueryHookResult = ReturnType<typeof useGetCurrentUserByEmailQuery>;
export type GetCurrentUserByEmailLazyQueryHookResult = ReturnType<typeof useGetCurrentUserByEmailLazyQuery>;
export type GetCurrentUserByEmailQueryResult = Apollo.QueryResult<GetCurrentUserByEmailQuery, GetCurrentUserByEmailQueryVariables>;