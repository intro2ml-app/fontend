import {
  BrainCircuit,
  ClockAlert,
  LoaderCircle,
  Star,
  User,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';
import { Separator } from './ui/separator';

type ModelSelectorProps = {
  models: any;
  model: any;
  setModel: (model: any) => void;
  setChat: (chat: any) => void;
};

export default function ModelSelector({
  models,
  model,
  setModel,
  setChat,
}: ModelSelectorProps) {
  const [hoverModel, setHoverModel] = useState();
  const [hover, setHover] = useState(false);

  return (
    <div className='relative'>
      <Select
        onValueChange={(value) => {
          setModel(value);
          setChat([]);
          setHover(false);
        }}
      >
        <SelectTrigger className='w-fit flex gap-2'>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: no input */}
          <label className='text-[#9A9B9F]'>Select model</label>
          <SelectValue
            placeholder={
              model?.model_name || <LoaderCircle className='animate-spin' />
            }
          />
        </SelectTrigger>
        <SelectContent onMouseLeave={() => setHover(false)}>
          {models?.map((model: any) => (
            <div key={model._id} className='relative'>
              <SelectItem
                key={model._id}
                value={model}
                onMouseOver={() => {
                  setHoverModel(model);
                  setHover(true);
                }}
              >
                {model.model_name}
              </SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
      {hover && (
        <div className='w-96 absolute z-[999] top-0 right-0 bg-[#F9F9F9] dark:bg-[#202123] p-2 rounded-md shadow-md'>
          <h3 className='capitalize text-lg'>
            {hoverModel?.model_name.split('-').join(' ')}
          </h3>
          <div className='flex gap-2 text-sm'>
            <div className='flex-1 py-2'>
              <div className='flex gap-2 items-center'>
                <Star size={20} />
                <p>Best for: </p>
              </div>
              <p>{hoverModel?.best_for}</p>
            </div>
            <Separator orientation='vertical' className='!bg-black' />
            <div className='flex-1 py-2'>
              <div className='flex gap-2 items-center'>
                <User size={20} />
                <p>Use case: </p>
              </div>
              <p>{hoverModel?.use_case}</p>
            </div>
          </div>
          <Separator className='!bg-black' />
          <div className='flex gap-2 text-sm'>
            <div className='flex-1 py-2'>
              <div className='flex gap-2 items-center'>
                <BrainCircuit size={20} />
                <p>Knowledge cutoff: </p>
              </div>
              <p>{new Date(hoverModel?.knowledge_cutoff).toDateString()}</p>
            </div>
            <Separator orientation='vertical' className='!bg-black' />
            <div className='flex-1 py-2'>
              <div className='flex gap-2 items-center'>
                <ClockAlert size={20} />
                <p>Other limits: </p>
              </div>
              <p>Input limit: {hoverModel?.input_limit}</p>
              <p>Output limit: {hoverModel?.output_limit}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
