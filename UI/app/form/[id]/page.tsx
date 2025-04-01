import FormComerciante from "./FormComerciante";

async function Page({ params }: { params: Promise<{ id: string }> }) {
 
  const { id } = await params;
  return (
    <FormComerciante id={id} />
  );
}

export default Page;
