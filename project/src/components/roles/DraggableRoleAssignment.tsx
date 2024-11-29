import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRBACStore } from '../../store/rbacStore';
import type { Role } from '../../types/rbac';
import { GripVertical } from 'lucide-react';

interface SortableRoleItemProps {
  role: Role;
}

function SortableRoleItem({ role }: SortableRoleItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: role.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-4 bg-white border rounded-lg mb-2 cursor-move"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
      <div>
        <h3 className="font-medium">{role.name}</h3>
        <p className="text-sm text-gray-500">{role.description}</p>
      </div>
    </div>
  );
}

export default function DraggableRoleAssignment() {
  const { roles, updateRole } = useRBACStore();
  const [items, setItems] = React.useState(roles);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((role) => (
            <SortableRoleItem key={role.id} role={role} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
} 