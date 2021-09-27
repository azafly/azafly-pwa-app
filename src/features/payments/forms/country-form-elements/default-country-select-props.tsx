import { CountrySelectProps } from './country-select'
import { useCountryList, Country } from './use-country-list'
import { RenderOptions } from './render-option-label';
import { ReactElement } from 'react';

export type DefaultCountrySelectProps = Omit<CountrySelectProps, 'handleCountryChange' | 'classKeys' | 'renderOption'>
    & { renderOption?: (option: Country) => ReactElement }

export const useDefaultCountrySelectProps = ({ options, defaultOption, getOptionDisabled, getOptionLabel, renderOption }: DefaultCountrySelectProps) => {
    const { topSources, NIGERIA } = useCountryList();
    const defaultProps: DefaultCountrySelectProps = {}

    defaultProps['defaultOption'] = !defaultOption ? NIGERIA : defaultOption
    defaultProps['options'] = !options ? topSources : options
    defaultProps['getOptionDisabled'] = !getOptionDisabled ? (option: Country) => option.isComingSoon || option.isNotSupported : getOptionDisabled
    defaultProps['getOptionLabel'] = !getOptionLabel ? (option: Country) => ` ${option.emoji}  ${option.name}(${option.currency})` : getOptionLabel
    defaultProps['renderOption'] = !renderOption ? (option) => <RenderOptions option={option} /> : renderOption


    return defaultProps as Required<DefaultCountrySelectProps>

}