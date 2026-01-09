"use client";

import { useState, type FormEvent } from "react";
import {
    Button,
    Checkbox,
    Field,
    Fieldset,
    Input,
    Label,
    Legend,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const brands = [
    { label: "Aurora Atelier", value: "aurora" },
    { label: "Lumen & Co.", value: "lumen" },
    { label: "Northwind", value: "northwind" },
    { label: "Solstice Studio", value: "solstice" },
];

const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Popularity", value: "popularity" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];

function SidebarFilter() {
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("relevance");

    const toggleBrand = (value: string) => {
        setSelectedBrands((prev) =>
            prev.includes(value)
                ? prev.filter((brand) => brand !== value)
                : [...prev, value]
        );
    };

    const handleReset = () => {
        setSearch("");
        setMinPrice("");
        setMaxPrice("");
        setSelectedBrands([]);
        setSortBy("relevance");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <aside className="w-full rounded-2xl">
            <header>
                <p className="font-bold uppercase tracking-wide text-amber-950">Filters</p>

            </header>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="search" className="text-sm font-medium font-serif text-amber-950">
                        Search
                    </Label>
                    <Input
                        id="search"
                        name="search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Find an item"
                        className="mt-2 w-full rounded-lg border p-3 text-sm text-amber-950 focus:outline-none focus:ring-2"
                    />
                </Field>

                <Field>
                    <Label htmlFor="sortBy" className="text-sm font-medium font-serif text-amber-900">
                        Sort by
                    </Label>
                    <div className="mt-2 relative">
                        <input type="hidden" name="sortBy" value={sortBy} />
                        <Listbox value={sortBy} onChange={setSortBy}>
                            <ListboxButton className="flex w-full items-center justify-between rounded-lg border border-amber-950 bg-white px-3 py-3 text-sm text-amber-900 focus-visible:outline-none focus-visible:ring-2">
                                <span>{sortOptions.find((option) => option.value === sortBy)?.label}</span>
                                <ChevronUpDownIcon className="h-4 w-4 text-amber-950" aria-hidden="true" />
                            </ListboxButton>
                            <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl border bg-white p-1 text-sm shadow-lg">
                                {sortOptions.map(({ label, value }) => (
                                    <ListboxOption
                                        key={value}
                                        value={value}
                                        className="cursor-pointer rounded-lg px-3 py-2 text-amber-900 data-[active]:bg-red-50 data-[selected]:bg-red-100"
                                    >
                                        {label}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                </Field>

                <Fieldset className="space-y-3">
                    <Legend className="text-sm font-medium text-amber-900 font-serif">Price range</Legend>
                    <div className="grid grid-cols-2 gap-3">
                        <Field>
                            <Label htmlFor="minPrice" className="text-xs uppercase text-amber-950">
                                Min
                            </Label>
                            <Input
                                id="minPrice"
                                name="minPrice"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                value={minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                                placeholder="0"
                                className="mt-1 w-full rounded-lg border p-3 text-sm text-amber-950 focus:outline-none focus:ring-2"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="maxPrice" className="text-xs uppercase text-amber-950">
                                Max
                            </Label>
                            <Input
                                id="maxPrice"
                                name="maxPrice"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                value={maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                                placeholder="500"
                                className="mt-1 w-full rounded-lg border p-3 text-sm text-amber-950 focus:outline-none focus:ring-2"
                            />
                        </Field>
                    </div>
                </Fieldset>

                <Fieldset>
                    <Legend className="text-sm font-medium text-amber-900 font-serif">Brands</Legend>
                    <div className="mt-3 space-y-2">
                        {brands.map(({ label, value }) => (
                            <Label
                                key={value}
                                className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-1 text-sm text-amber-950 transition"
                            >
                                <Checkbox
                                    checked={selectedBrands.includes(value)}
                                    onChange={() => toggleBrand(value)}
                                    className="group inline-flex h-5 w-5 items-center justify-center rounded border border-amber-950 bg-white text-white transition data-[checked]:border-amber-900 data-[checked]:bg-amber-900"
                                >
                                    <CheckIcon className="h-3 w-3 opacity-0 transition group-data-[checked]:opacity-100" />
                                </Checkbox>
                                {label}
                            </Label>
                        ))}
                    </div>
                </Fieldset>



                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex w-full items-center justify-center rounded-lg border border-amber-950 px-4 py-3 text-sm font-semibold text-amber-700 transition hover:border-red-300 hover:bg-red-50"
                    >
                        Reset filters
                    </Button>
                    <Button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-amber-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
                    >
                        Apply filters
                    </Button>
                </div>
            </form>
        </aside>
    );
}

export default SidebarFilter;
