import {useDroppable} from '@dnd-kit/react';

function Droppable({id, children}: {id: string, children: any}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref} style={{width: 300, height: 300}}>
      {children}
    </div>
  );
}

export default Droppable;