import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { DragHandleDots2Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, useFieldArray, useFormContext } from "react-hook-form";
import { FEATURES, FILE, PRODUCT_FIELDS, RATINGS, RICH_TEXT, TEXTAREA } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import RichEditor from "../Editor/RichEditor";
import ArrayField from "./ArrayField";
import ProductCard from "../product/Card";
import useSWR, { SWRResponse } from "swr";
import { getData } from "@/lib/dataservices";
import HorizontalCard from "../product/HorizontalCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProductList from "../product/ProductList";
import { toast } from "../ui/use-toast";

const AddSelected: React.FC<actionType> = ({ selected, onSubmit, clearSelected }) => {
  const handleClick = () => {
    onSubmit?.(selected);
    toast({
      description: `Successfuly added ${selected.length} products`,
    });
    clearSelected?.();
  };
  return (
    selected.length > 0 && (
      <Button onClick={handleClick}>{`Add ${selected.length} Product(s)`}</Button>
    )
  );
};

const AddProductDialog = ({ onToggle, isOpen, onSubmit, preSelected }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => onToggle(open)}>
      <DialogContent className="sm:max-w-[80vw] h-[95vh]">
        <ProductList
          onSubmit={onSubmit}
          Action={AddSelected}
          productPermissions={{ edit: false, select: true, delete: false, copy: false }}
          preSelected={preSelected}
        />
      </DialogContent>
    </Dialog>
  );
};

const CustomCard = ({ prod, onDelete }) => (
  <div className="flex items-center">
    <div className="flex-1">
      <HorizontalCard data={prod} />
    </div>
    <div className="flex gap-2 flex-col m-1">
      <Button variant={"destructive"} onClick={() => onDelete(prod.id, prod.title)}>
        <TrashIcon />
      </Button>
      <Button variant={"secondary"}>
        <DragHandleDots2Icon />
      </Button>
    </div>
  </div>
);

type Props = { field?: ControllerRenderProps<BlogOrProductCards, any> };

const reorder = (list, startIndex, endIndex): resProductFields[] => {
  const result = Array.from<resProductFields>(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Products({ field }: Props) {
  const [open, toggleOpen] = useState(false);
  const onToggle = (open) => toggleOpen(open);
  // const [products, setProducts] = useState<resProductFields[]>([]);
  // useEffect(() => {
  //   setProducts(field?.value);
  // }, []);
  const onDragEnd = useCallback((field, result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(field?.value, result.source.index, result.destination.index);
    field?.onChange(items);
  }, []);
  const hanldeOnDelete = (id, title) => {
    const result = field?.value?.filter((e) => e.id !== id);
    field?.onChange(result);
    toast({
      description: `Successfuly deleted ${title}`,
    });
  };
  return (
    <Card>
      <CardContent>
        <DragDropContext onDragEnd={(result) => onDragEnd(field, result)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {field?.value?.map((prod, i) => (
                  <Draggable key={prod.id} draggableId={prod.id} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        <CustomCard prod={prod} key={prod.title} onDelete={hanldeOnDelete} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddProductDialog
          isOpen={open}
          onToggle={onToggle}
          onSubmit={(selected) => {
            field?.onChange([...(field.value ?? []), ...selected]);
          }}
          preSelected={field?.value}
        />
        <Button variant={"secondary"} type="button" className="mt-3" onClick={() => onToggle(true)}>
          <Pencil2Icon className="w-4 h-4" />
          <span className="p-2">Add Product</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Products;
