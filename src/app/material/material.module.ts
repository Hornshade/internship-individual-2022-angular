import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule,
        MatCardModule
    ],
    exports: [MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule,
        MatCardModule
    ]
})

export class MaterialModule{}
