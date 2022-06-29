import Text from '@/components/core/Text';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ExclamationCircleIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import { Fragment } from 'react';

interface Props {
  selected: string;
  setSelected: (value: string) => void;
  options: Array<{ text: string; value: string }>;
  className?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  error?: string;
  hint?: string;
}

const Select = ({
  selected,
  setSelected,
  options,
  className,
  placeholder,
  label,
  name,
  hint,
  error,
}: Props) => (
  <div className={className}>
    {label && (
      <div className="flex justify-between">
        <Text htmlFor={name} label>
          {label}
        </Text>
        {hint && (
          <span className="text-sm text-gray-500" id="email-optional">
            {hint}
          </span>
        )}
      </div>
    )}
    <div className="mt-1 relative rounded-md shadow-sm">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {options.find((item) => item.value === selected)?.text ??
                placeholder ??
                'Selecione'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((item) => (
                <Listbox.Option
                  key={`${item.value} ${item.text}`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          isSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.text}
                      </span>
                      {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {!!error && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
    {!!error && (
      <p className="mt-2 text-sm text-red-600" id="error">
        {error}
      </p>
    )}
  </div>
);

export default Select;
