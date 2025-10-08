import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderHttpInterceptor} from "../shared/intercepter/header-http-interceptor";

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeaderHttpInterceptor, multi: true}],
})
export class AppHttpModule {
}
