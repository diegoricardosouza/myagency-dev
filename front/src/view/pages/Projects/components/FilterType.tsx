/* eslint-disable react-refresh/only-export-components */
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { Checkbox } from "@/view/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/view/components/ui/popover";
import { CirclePlus, Search } from "lucide-react";

interface getTypeDisplayProps {
  statusFilter: string[];
  typeOptions: {
    value: string;
    label: string;
    count: number;
  }[]
}

export function GetTypeDisplay({ statusFilter, typeOptions }: getTypeDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <CirclePlus className="mr-2 h-4 w-4" />
        Tipo
      </div>
      {statusFilter.length > 0 && statusFilter.length <= 2 && (
        <>
          <div className="h-4 w-px bg-border" />
          <div className="flex gap-1">
            {statusFilter.map((status) => {
              const option = typeOptions?.find((opt) => opt.value === status)
              return (
                <div
                  key={status}
                  className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs"
                >
                  {option?.label || status}
                </div>
              )
            })}
          </div>
        </>
      )}
      {statusFilter.length > 2 && (
        <>
          <div className="h-4 w-px bg-border" />
          <Badge variant="secondary" className="rounded-sm px-1 text-xs">
            {statusFilter.length} selecionados
          </Badge>
        </>
      )}
    </div>
  )
}

interface PopoverTypeProps {
  statusFilter: string[];
  typeOptions: {
    value: string;
    label: string;
    count: number;
  }[];
  filteredStatusOptions: {
    value: string;
    label: string;
    count: number;
  }[]
  statusSearch: string;
  setStatusSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
}

export function PopoverType({
  statusFilter,
  typeOptions,
  statusSearch,
  filteredStatusOptions,
  setStatusSearch,
  setStatusFilter,
  clearFilters
}: PopoverTypeProps) {
  const handleStatusToggle = (value: string) => {
    setStatusFilter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 border-dashed text-sm">
            <GetTypeDisplay
              statusFilter={statusFilter}
              typeOptions={typeOptions}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex items-center border-b px-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Tipo"
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={statusSearch}
              onChange={(e) => setStatusSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-auto p-1">
            {filteredStatusOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between rounded-sm px-2 py-1.5 hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-sm font-light">
                  <Checkbox
                    id={option.value}
                    checked={statusFilter.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleStatusToggle(option.value)
                      } else {
                        handleStatusToggle(option.value)
                      }
                    }}
                  />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </label>
                </div>
                <span className="text-muted-foreground text-sm">{option.count}</span>
              </div>
            ))}
          </div>
          {statusFilter.length > 0 && (
            <div className="border-t p-1">
              <Button variant="ghost" className="w-full justify-center font-normal text-sm h-8" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

interface GetActiveDisplayProps {
  activeFilter: string[];
  activeOptions: {
    value: string;
    label: string;
    count: number;
  }[]
}

export function GetActiveDisplay({ activeFilter, activeOptions }: GetActiveDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <CirclePlus className="mr-2 h-4 w-4" />
        Status
      </div>
      {activeFilter.length > 0 && activeFilter.length <= 2 && (
        <>
          <div className="h-4 w-px bg-border" />
          <div className="flex gap-1">
            {activeFilter.map((status) => {
              const option = activeOptions?.find((opt) => opt.value === status)
              return (
                <div
                  key={status}
                  className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-xs"
                >
                  {option?.label || status}
                </div>
              )
            })}
          </div>
        </>
      )}
      {activeFilter.length > 2 && (
        <>
          <div className="h-4 w-px bg-border" />
          <Badge variant="secondary" className="rounded-sm px-1 text-xs">
            {activeFilter.length} selecionados
          </Badge>
        </>
      )}
    </div>
  )
}

interface PopoverActiveProps {
  activeFilter: string[];
  activeOptions: {
    value: string;
    label: string;
    count: number;
  }[];
  filteredActiveOptions: {
    value: string;
    label: string;
    count: number;
  }[]
  activeSearch: string;
  setActiveSearch: React.Dispatch<React.SetStateAction<string>>;
  setActiveFilter: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
}

export function PopoverActive({
  activeFilter,
  activeOptions,
  activeSearch,
  filteredActiveOptions,
  setActiveSearch,
  setActiveFilter,
  clearFilters
}: PopoverActiveProps) {
  const handleStatusToggle = (value: string) => {
    setActiveFilter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 border-dashed text-sm">
            <GetActiveDisplay
              activeFilter={activeFilter}
              activeOptions={activeOptions}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <div className="flex items-center border-b px-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Status"
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={activeSearch}
              onChange={(e) => setActiveSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-auto p-1">
            {filteredActiveOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between rounded-sm px-2 py-1.5 hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-sm font-light">
                  <Checkbox
                    id={option.value}
                    checked={activeFilter.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleStatusToggle(option.value)
                      } else {
                        handleStatusToggle(option.value)
                      }
                    }}
                  />
                  <label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </label>
                </div>
                <span className="text-muted-foreground text-sm">{option.count}</span>
              </div>
            ))}
          </div>
          {activeFilter.length > 0 && (
            <div className="border-t p-1">
              <Button variant="ghost" className="w-full justify-center font-normal text-sm h-8" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}
