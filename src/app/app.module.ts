import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http' 
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularEditorModule } from '@kolkov/angular-editor';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { HomeComponent } from './components/home/home.component';
import { TopicComponent } from './components/topic/topic.component';
import { CongressComponent } from './components/congress/congress.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminCongressAddComponent } from './components/admin/admin-congress-add/admin-congress-add.component';
import { AdminTopicAddComponent } from './components/admin/admin-topic-add/admin-topic-add.component';
import { AdminAnnouncementAddComponent } from './components/admin/admin-announcement-add/admin-announcement-add.component';
import { AdminRegulatoryBoardAddComponent } from './components/admin/admin-regulatory-board-add/admin-regulatory-board-add.component';
import { AdminScienceBoardAddComponent } from './components/admin/admin-science-board-add/admin-science-board-add.component';
import { AdminTransportLayoverAddComponent } from './components/admin/admin-transport-layover-add/admin-transport-layover-add.component';
import { AdminCongressPresidentAddComponent } from './components/admin/admin-congress-president-add/admin-congress-president-add.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminCongressPresidentDeleteComponent } from './components/admin/admin-congress-president-delete/admin-congress-president-delete.component';
import { AdminCongressPresidentUpdateComponent } from './components/admin/admin-congress-president-update/admin-congress-president-update.component';
import { AdminCongressPresidentManagerComponent } from './components/admin/admin-congress-president-manager/admin-congress-president-manager.component';
import { AdminTransportLayoverDeleteComponent } from './components/admin/admin-transport-layover-delete/admin-transport-layover-delete.component';
import { AdminTransportLayoverUpdateComponent } from './components/admin/admin-transport-layover-update/admin-transport-layover-update.component';
import { AdminTransportLayoverManagerComponent } from './components/admin/admin-transport-layover-manager/admin-transport-layover-manager.component';
import { AdminTopicDeleteComponent } from './components/admin/admin-topic-delete/admin-topic-delete.component';
import { AdminTopicUpdateComponent } from './components/admin/admin-topic-update/admin-topic-update.component';
import { AdminTopicManagerComponent } from './components/admin/admin-topic-manager/admin-topic-manager.component';
import { AdminScienceBoardDeleteComponent } from './components/admin/admin-science-board-delete/admin-science-board-delete.component';
import { AdminScienceBoardUpdateComponent } from './components/admin/admin-science-board-update/admin-science-board-update.component';
import { AdminScienceBoardManagerComponent } from './components/admin/admin-science-board-manager/admin-science-board-manager.component';
import { AdminRegulatoryBoardDeleteComponent } from './components/admin/admin-regulatory-board-delete/admin-regulatory-board-delete.component';
import { AdminRegulatoryBoardUpdateComponent } from './components/admin/admin-regulatory-board-update/admin-regulatory-board-update.component';
import { AdminRegulatoryBoardManagerComponent } from './components/admin/admin-regulatory-board-manager/admin-regulatory-board-manager.component';
import { AdminCongressDeleteComponent } from './components/admin/admin-congress-delete/admin-congress-delete.component';
import { AdminCongressUpdateComponent } from './components/admin/admin-congress-update/admin-congress-update.component';
import { AdminCongressManagerComponent } from './components/admin/admin-congress-manager/admin-congress-manager.component';
import { AdminAnnouncementDeleteComponent } from './components/admin/admin-announcement-delete/admin-announcement-delete.component';
import { AdminAnnouncementUpdateComponent } from './components/admin/admin-announcement-update/admin-announcement-update.component';
import { AdminAnnouncementManagerComponent } from './components/admin/admin-announcement-manager/admin-announcement-manager.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { CongressDetailsComponent } from './components/congress-details/congress-details.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { LoginComponent } from './components/account/account-login/account-login.component';
import { RegisterComponent } from './components/account/account-register/account-register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegulatoryBoardComponent } from './components/regulatory-board/regulatory-board.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeeAllAnnounceComponent } from './components/see-all-announce/see-all-announce.component';
import { TransportLayoverComponent } from './components/transport-layover/transport-layover.component';
import { AdminUserManagerComponent } from './components/admin/admin-user-manager/admin-user-manager.component';
import { AdminUserAddComponent } from './components/admin/admin-user-add/admin-user-add.component';
import { AdminUserDeleteComponent } from './components/admin/admin-user-delete/admin-user-delete.component';
import { AdminUserUpdateComponent } from './components/admin/admin-user-update/admin-user-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminContactDeleteComponent } from './components/admin/admin-contact-delete/admin-contact-delete.component';
import { AdminContactManagerComponent } from './components/admin/admin-contact-manager/admin-contact-manager.component';
import { AdminShowContactComponent } from './components/admin/admin-show-contact/admin-show-contact.component';
import { KongreComponent } from './components/kongre/kongre.component';
import { KongreImageComponent } from './components/kongre-image/kongre-image.component';
import { AdminKongreManagerComponent } from './components/admin/admin-kongre-manager/admin-kongre-manager.component';
import { AdminKongreAddComponent } from './components/admin/admin-kongre-add/admin-kongre-add.component';
import { AdminKongreDeleteComponent } from './components/admin/admin-kongre-delete/admin-kongre-delete.component';
import { AdminKongreUpdateComponent } from './components/admin/admin-kongre-update/admin-kongre-update.component';
import { SaveComponent } from './components/save/save.component';
import { BankAccountInfoComponent } from './components/bank-account-info/bank-account-info.component';
import { TrBankAccountInfoComponent } from './components/tr-bank-account-info/tr-bank-account-info.component';
import { AdminSaveManagerComponent } from './components/admin/admin-save-manager/admin-save-manager.component';
import { AdminSaveAddComponent } from './components/admin/admin-save-add/admin-save-add.component';
import { AdminSaveDeleteComponent } from './components/admin/admin-save-delete/admin-save-delete.component';
import { AdminSaveUpdateComponent } from './components/admin/admin-save-update/admin-save-update.component';
import { AdminBankAccountManagerComponent } from './components/admin/admin-bank-account-manager/admin-bank-account-manager.component';
import { AdminBankAccountAddComponent } from './components/admin/admin-bank-account-add/admin-bank-account-add.component';
import { AdminBankAccountDeleteComponent } from './components/admin/admin-bank-account-delete/admin-bank-account-delete.component';
import { AdminBankAccountUpdateComponent } from './components/admin/admin-bank-account-update/admin-bank-account-update.component';
import { AdminTrBankAccountManagerComponent } from './components/admin/admin-tr-bank-account-manager/admin-tr-bank-account-manager.component';
import { AdminTrBankAccountAddComponent } from './components/admin/admin-tr-bank-account-add/admin-tr-bank-account-add.component';
import { AdminTrBankAccountDeleteComponent } from './components/admin/admin-tr-bank-account-delete/admin-tr-bank-account-delete.component';
import { AdminTrBankAccountUpdateComponent } from './components/admin/admin-tr-bank-account-update/admin-tr-bank-account-update.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { AdminGeneralInformationManagerComponent } from './components/admin/admin-general-information-manager/admin-general-information-manager.component';
import { AdminGeneralInformationAddComponent } from './components/admin/admin-general-information-add/admin-general-information-add.component';
import { AdminGeneralInformationDeleteComponent } from './components/admin/admin-general-information-delete/admin-general-information-delete.component';
import { AdminGeneralInformationUpdateComponent } from './components/admin/admin-general-information-update/admin-general-information-update.component';










@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    AnnouncementComponent,
    HomeComponent,
    TopicComponent,
    CongressComponent,
    ProfileComponent,
    AdminCongressAddComponent,
    AdminTopicAddComponent,
    AdminAnnouncementAddComponent,
    AdminRegulatoryBoardAddComponent,
    AdminScienceBoardAddComponent,
    AdminTransportLayoverAddComponent,
    AdminCongressPresidentAddComponent,
    AdminLayoutComponent,
    AdminCongressPresidentDeleteComponent,
    AdminCongressPresidentUpdateComponent,
    AdminCongressPresidentManagerComponent,
    AdminTransportLayoverDeleteComponent,
    AdminTransportLayoverUpdateComponent,
    AdminTransportLayoverManagerComponent,
    AdminTopicDeleteComponent,
    AdminTopicUpdateComponent,
    AdminTopicManagerComponent,
    AdminScienceBoardDeleteComponent,
    AdminScienceBoardUpdateComponent,
    AdminScienceBoardManagerComponent,
    AdminRegulatoryBoardDeleteComponent,
    AdminRegulatoryBoardUpdateComponent,
    AdminRegulatoryBoardManagerComponent,
    AdminCongressDeleteComponent,
    AdminCongressUpdateComponent,
    AdminCongressManagerComponent,
    AdminAnnouncementDeleteComponent,
    AdminAnnouncementUpdateComponent,
    AdminAnnouncementManagerComponent,
    HomeLayoutComponent,
    CongressDetailsComponent,
    AccountLayoutComponent,
    LoginComponent,
    RegisterComponent,
    RegulatoryBoardComponent,
    SideNavComponent,
    FooterComponent,
    SeeAllAnnounceComponent,
    TransportLayoverComponent,
    AdminUserManagerComponent,
    AdminUserAddComponent,
    AdminUserDeleteComponent,
    AdminUserUpdateComponent,
    ContactComponent,
    AdminContactDeleteComponent,
    AdminContactManagerComponent,
    AdminShowContactComponent,
    KongreComponent,
    KongreImageComponent,
    AdminKongreManagerComponent,
    AdminKongreAddComponent,
    AdminKongreDeleteComponent,
    AdminKongreUpdateComponent,
    SaveComponent,
    BankAccountInfoComponent,
    TrBankAccountInfoComponent,
    AdminSaveManagerComponent,
    AdminSaveAddComponent,
    AdminSaveDeleteComponent,
    AdminSaveUpdateComponent,
    AdminBankAccountManagerComponent,
    AdminBankAccountAddComponent,
    AdminBankAccountDeleteComponent,
    AdminBankAccountUpdateComponent,
    AdminTrBankAccountManagerComponent,
    AdminTrBankAccountAddComponent,
    AdminTrBankAccountDeleteComponent,
    AdminTrBankAccountUpdateComponent,
    GeneralInformationComponent,
    AdminGeneralInformationManagerComponent,
    AdminGeneralInformationAddComponent,
    AdminGeneralInformationDeleteComponent,
    AdminGeneralInformationUpdateComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    NgxSpinnerModule,
    AngularEditorModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
