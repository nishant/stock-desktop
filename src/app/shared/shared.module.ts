import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components';
import { EmbeddedScriptComponent } from './components/component-script/embedded-script.component';
import { TradingViewAnalysisComponent } from './components/trading-view-analysis/trading-view-analysis.component';
import { TradingViewCompanyProfileComponent } from './components/trading-view-company-profile/trading-view-company-profile.component';
import { TradingViewFundamentalDataComponent } from './components/trading-view-fundamental-data/trading-view-fundamental-data.component';
import { TradingViewGraphComponent } from './components/trading-view-graph/trading-view-graph.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TradingViewGraphComponent,
    TradingViewAnalysisComponent,
    EmbeddedScriptComponent,
    TradingViewFundamentalDataComponent,
    TradingViewCompanyProfileComponent,
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    FormsModule,
    TradingViewGraphComponent,
    TradingViewAnalysisComponent,
    TradingViewFundamentalDataComponent,
    TradingViewCompanyProfileComponent,
  ],
})
export class SharedModule {}
