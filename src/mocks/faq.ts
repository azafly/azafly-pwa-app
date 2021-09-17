
import faker from 'faker'

export const categories: any = ['general', 'payments', 'visa and immigration', 'refund', 'services']


const total = Array(5).fill(null)
export const mockArticles = () => total.map(() => ({
    title: faker.lorem.sentence(7, 2),
    content: faker.lorem.paragraphs(2)
}))


export const getFakeArticles: Promise<any> = new Promise((resolve) => {

    const articleByCategory = categories.map((it: any) => {
        return [it, mockArticles()]

    })
    resolve(articleByCategory)
})

