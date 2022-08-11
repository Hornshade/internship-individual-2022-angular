import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule
    ],
    exports: [MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSelectModule,
        MatMenuModule,
        MatCardModule,
        MatDialogModule
    ]
})

export class MaterialModule{}
