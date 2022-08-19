import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	imports: [
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
		MatSelectModule,
		MatMenuModule,
		MatCardModule,
		MatDialogModule,
		MatRadioModule,
		MatTabsModule,
		MatDividerModule,
		MatPaginatorModule,
		MatCheckboxModule,
	],
	exports: [
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatToolbarModule,
		MatSelectModule,
		MatMenuModule,
		MatCardModule,
		MatDialogModule,
		MatRadioModule,
		MatTabsModule,
		MatDividerModule,
		MatPaginatorModule,
		MatCheckboxModule,
	],
})
export class MaterialModule {}
