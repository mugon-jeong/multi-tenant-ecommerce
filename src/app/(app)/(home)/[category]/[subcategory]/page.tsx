interface Props {
  params: Promise<{
    category: string
    subcategory: string
  }>
}
export default async function Page({ params }: Props) {
  const { category, subcategory } = await params
  return <div>Page</div>
}
