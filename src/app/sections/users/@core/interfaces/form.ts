import { WritableSignal } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface IForm { 
    first_name: FormControl<string | null>,
    last_name: FormControl<string | null>,
    email: FormControl<string | null>
}

export interface ErrorMessages {
    [key: string]: WritableSignal<string>;
}