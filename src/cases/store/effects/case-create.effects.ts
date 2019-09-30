import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Injectable()
export class CaseCreateEffects {
  constructor(
    private actions$: Actions,
    private alertService: AlertService,
    private router: Router,
    private loggerService: LoggerService
  ) {}

  @Effect()
  applyChangeCaseCreateFilter$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_FILTER_APPLY),
    map((action: fromActions.CaseCreateFilterApply) => action.payload),
    map(param => {
      // caseTypeId: "FinancialRemedyForDAC"
      // eventId: "FR_solicitorCreate"
      // jurisdictionId: "DIVORCE"
      return new fromRoot.Go({
        path: [`/cases/case-create/${param.jurisdictionId}/${param.caseTypeId}/${param.eventId}`]
      });
    })
  );

  @Effect()
  applyCreateCase$ = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE_APPLY),
    map((action: fromActions.ApplyChange) => action.payload),
    map(newCases => {
        return new fromRoot.CreateCaseGo({
          path: [`/cases/case-details/${newCases.caseId}`],
          caseId: newCases.caseId
        });
    })
  );

  @Effect()
  applyCreatedCaseLoaded$ = this.actions$.pipe(
    ofType(fromActions.CREATED_CASE_LOADED),
    map((payload: any) => {
       this.alertService.success(`Case #${payload.caseId} has been created.`);
       return new fromRoot.NewCaseLoadedSuccessfully();
    }),
  );
}
