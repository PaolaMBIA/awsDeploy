function RenderCount(props: RenderProps) {
  const { countRender } = props;
  return <span>{countRender}</span>;
}

export default RenderCount;

interface RenderProps {
  countRender: number;
}
