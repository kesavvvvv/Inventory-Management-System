import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SupplierComponent } from './supplier/supplier.component';
import { OrderComponent } from './order/order.component';
import { CustomerComponent } from './customer/customer.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AuthGuard } from '././auth/auth.gaurd';
import { AuthService } from './auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeDialogComponent } from './home/home-dialog/home-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GraphsComponent } from './graphs/graphs.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { OrderDialogComponent } from './order/order-dialog/order-dialog.component';
import { PurchaseDialogComponent } from './purchase/purchase-dialog/purchase-dialog.component';
import { CustomerDialogComponent } from './customer/customer-dialog/customer-dialog.component';
import { SupplierDialogComponent } from './supplier/supplier-dialog/supplier-dialog.component';
import { UpdtaeOrderDialogComponent } from './order/updtae-order-dialog/updtae-order-dialog.component';
import { UpdatePurchaseDialogComponent } from './purchase/update-purchase-dialog/update-purchase-dialog.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'supplier', component: SupplierComponent },
  { path: 'order', component: OrderComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'graphs', component: GraphsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SupplierComponent,
    OrderComponent,
    CustomerComponent,
    PurchaseComponent,
    HomeDialogComponent,
    GraphsComponent,
    OrderDialogComponent,
    PurchaseDialogComponent,
    CustomerDialogComponent,
    SupplierDialogComponent,
    UpdtaeOrderDialogComponent,

    UpdatePurchaseDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ScrollingModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [HomeDialogComponent],
})
export class AppModule {}
