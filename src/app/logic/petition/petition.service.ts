import { Injectable } from '@angular/core';

import { catchError, delay, from, map, Observable, of, tap } from 'rxjs';
import {
  ApprovePetitionInput,
  ApprovePetitionMutation,
  CandidatePetition,
  CandidatePetitionInput,
  CodeSubmissionResult,
  EditCandidatePetitionInput,
  EditCandidatePetitionMutation,
  EditIssuePetitionInput,
  EditIssuePetitionMutation,
  GetPetitionQuery,
  GetPetitionsByOwnerQuery,
  GetPetitionsByTypeQuery,
  GetVoterRecordMatchQuery,
  IssuePetition,
  IssuePetitionInput,
  PetitionsByOwnerInput,
  PetitionsByTypeInput,
  PetitionStatusQuery,
  PetitionType,
  RejectPetitionMutation,
  SignatureVerification,
  SignatureVerificationInput,
  SubmitCandidatePetitionMutation,
  SubmitIssuePetitionMutation,
  SubmitSignatureMutation,
  SubmitVerificationCodeMutation,
  TargetPetitionInput,
  VoterRecordMatch,
  VoterRecordMatchInput,
} from 'src/app/core/api/API';
import { Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import {
  rejectPetition,
  submitSignature,
  submitVerificationCode,
} from 'src/graphql/mutations';
import { getPetitionsByType, getVoterRecordMatch } from 'src/graphql/queries';
import { __values } from 'tslib';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import {
  getPetition,
  getPetitionsByOwner,
  getPetitionsByType as getPetitionsByTypeAn,
} from 'src/graphql/not-generated/queries';
import {
  approvePetition,
  editCandidatePetition,
  editIssuePetition,
  submitCandidatePetition,
  submitIssuePetition,
  withdrawPetition,
} from 'src/graphql/not-generated/mutations';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { result } from 'cypress/types/lodash';

@Injectable({ providedIn: 'root' })
export class PetitionService {
  constructor(private _loggingService: LoggingService) {}

  newIssuePetition(
    data: IssuePetitionInput
  ): Observable<Result<IssuePetition>> {
    return from(
      API.graphql({
        query: submitIssuePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<SubmitIssuePetitionMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.submitIssuePetition })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  newCandidatePetition(
    data: CandidatePetitionInput
  ): Observable<Result<CandidatePetition>> {
    return from(
      API.graphql({
        query: submitCandidatePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<SubmitCandidatePetitionMutation>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: data?.submitCandidatePetition })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  signPetition(
    data: SignatureVerificationInput
  ): Observable<Result<SignatureVerification>> {
    return from(
      API.graphql({
        query: submitSignature,
        variables: { data },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<SubmitSignatureMutation>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: data?.submitSignature })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  getVoterRecordMatch(
    data: VoterRecordMatchInput
  ): Observable<Result<VoterRecordMatch>> {
    return from(
      API.graphql({
        query: getVoterRecordMatch,
        variables: { query: data },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<GetVoterRecordMatchQuery>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: data?.getVoterRecordMatch })),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  confirmSignaturePetition(
    data: string
  ): Observable<Result<CodeSubmissionResult>> {
    return from(
      API.graphql({
        query: submitVerificationCode,
        variables: { code: data },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<SubmitVerificationCodeMutation>>
    ).pipe(
      tap((value) => this._loggingService.log(value)),
      map(({ data }) => ({ result: data?.submitVerificationCode })),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  editPetitionIssue(
    data: EditIssuePetitionInput
  ): Observable<Result<IssuePetition>> {
    return from(
      API.graphql({
        query: editIssuePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<EditIssuePetitionMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.editIssuePetition as IssuePetition })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  editPetitionCandidate(
    data: EditCandidatePetitionInput
  ): Observable<Result<CandidatePetition>> {
    return from(
      API.graphql({
        query: editCandidatePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<EditCandidatePetitionMutation>>
    ).pipe(
      map(({ data }) => ({
        result: data?.editCandidatePetition as CandidatePetition,
      })),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  getPublicPetition(id: string): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: getPetition.public,
        variables: {
          PK: id,
        },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<GetPetitionQuery>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.getPetition?.type === PetitionType.ISSUE) {
            petition = { dataIssue: value.data.getPetition as IssuePetition };
          } else if (value.data.getPetition?.type === PetitionType.CANDIDATE) {
            petition = {
              dataCandidate: value.data.getPetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getCommitteePetition(id: string): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: getPetition.public,
        variables: {
          PK: id,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionQuery>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.getPetition?.type === PetitionType.ISSUE) {
            petition = { dataIssue: value.data.getPetition as IssuePetition };
          } else if (value.data.getPetition?.type === PetitionType.CANDIDATE) {
            petition = {
              dataCandidate: value.data.getPetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getStaffPetition(id: string): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: getPetition.staff,
        variables: {
          PK: id,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionQuery>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.getPetition?.type === PetitionType.ISSUE) {
            petition = { dataIssue: value.data.getPetition as IssuePetition };
          } else if (value.data.getPetition?.type === PetitionType.CANDIDATE) {
            petition = {
              dataCandidate: value.data.getPetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  withdrawPetition(data: TargetPetitionInput): Observable<Result<string>> {
    // return of({ result: 'SUCCESS' }).pipe(delay(3000));
    return from(
      API.graphql({
        query: withdrawPetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<EditIssuePetitionMutation>>
    ).pipe(
      map((value) => {
        if (!value.errors) return { result: 'SUCCESS' };
        else return { error: value.errors[0]?.message };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  approvePetition(
    data: ApprovePetitionInput
  ): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: approvePetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<ApprovePetitionMutation>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.approvePetition?.type === PetitionType.ISSUE) {
            petition = {
              dataIssue: value.data.approvePetition as IssuePetition,
            };
          } else if (
            value.data.approvePetition?.type === PetitionType.CANDIDATE
          ) {
            petition = {
              dataCandidate: value.data.approvePetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  denyPetition(
    data: TargetPetitionInput
  ): Observable<Result<ResponsePetition>> {
    return from(
      API.graphql({
        query: rejectPetition,
        variables: { data },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<RejectPetitionMutation>>
    ).pipe(
      map((value) => {
        let petition: ResponsePetition = {};
        if (value.data) {
          if (value.data.rejectPetition?.type === PetitionType.ISSUE) {
            petition = {
              dataIssue: value.data.rejectPetition as IssuePetition,
            };
          } else if (
            value.data.rejectPetition?.type === PetitionType.CANDIDATE
          ) {
            petition = {
              dataCandidate: value.data.rejectPetition as CandidatePetition,
            };
          }
        }
        return { result: petition };
      }),
      catchError((error) => of({ error: error.errors?.[0]?.message }))
    );
  }

  getCommitteePetitions(
    data: PetitionsByOwnerInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByOwner,
        variables: {
          query: data,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByOwnerQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByOwner.token
          ? value.data?.getPetitionsByOwner.token
          : undefined;

        value.data?.getPetitionsByOwner.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getInactivePetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByTypeAn,
        variables: {
          query: data,
        },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getCityStaffPetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {
          query: {
            status: data.status,
            cursor: data.cursor,
            type: data.type,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getActivePetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByType,
        variables: {
          query: data,
        },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }

  getAnonymousActivePetitions(
    data: PetitionsByTypeInput
  ): Observable<Result<BufferPetition>> {
    return from(
      API.graphql({
        query: getPetitionsByTypeAn,
        variables: {
          query: data,
        },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<GetPetitionsByTypeQuery>>
    ).pipe(
      map((value) => {
        let petitions: ResponsePetition[] = [];
        let cursor: string | undefined = value.data?.getPetitionsByType.token
          ? value.data?.getPetitionsByType.token
          : undefined;

        value.data?.getPetitionsByType.items.forEach((value) => {
          value.type === PetitionType.ISSUE
            ? petitions.push({ dataIssue: value as IssuePetition })
            : value.type === PetitionType.CANDIDATE
            ? petitions.push({ dataCandidate: value as CandidatePetition })
            : null;
        });

        return { result: { cursor: cursor, items: petitions } };
      }),
      catchError((error) => {
        return of({ error: error.errors?.[0]?.message });
      })
    );
  }
}
