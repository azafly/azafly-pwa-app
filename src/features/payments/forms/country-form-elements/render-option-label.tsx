import { Country } from './use-country-list'



export interface RenderOptions {
    option?: Country
}

export const RenderOptions = ({ option }: RenderOptions) => {

    return (<div>
        <span className='emoji' > {option?.emoji} </span>
        <span className='name' > {option?.name} </span>
        <span className='name' > ({option?.currency}) </span >
    </div>)
}
