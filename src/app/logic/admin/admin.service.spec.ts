import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { API, APIClass } from 'aws-amplify';
import {
  AccessLevel,
  AssetType,
  CreateStaffUserMutation,
  GetResourceUploadURLQuery,
  GetSiteResourcesQuery,
  GetUsersQuery,
  SiteConfigurationQuery,
  StaffAccessLevel,
  UpdateUserAccessMutation,
  User,
} from 'src/app/core/api/API';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { AdminService } from './admin.service';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { Result } from 'src/app/shared/models/exports';

describe('AdminService', () => {
  let service: AdminService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminService,

        { provide: HttpClient, useClass: HttpClientTestingModule },
      ],
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //getAllUser
  it('getAllUser should return a UserConection object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getUsersQuery });
      })
    );
    service.getAllUser({}).subscribe((data) => {
      expect(data.result).toEqual({
        __typename: 'UserConnection',
        items: [],
        token: undefined,
      });
      done();
    });
  });

  it('getAllUser should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.getAllUser({}).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //newMember
  it('newMember should return a User object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _user });
      })
    );
    service
      .newMember({ email: '', permissions: StaffAccessLevel.ADMIN })
      .subscribe((data) => {
        expect(data.result).toEqual({
          __typename: 'User',
          email: '',
          firstName: undefined,
          lastName: undefined,
          permissions: AccessLevel.ADMIN,
          username: '',
        });
        done();
      });
  });

  it('newMember should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service
      .newMember({ email: '', permissions: StaffAccessLevel.ADMIN })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  //changeAccountPermission
  it('changeAccountPermission should return a User object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _updateUserAccessMutation });
      })
    );
    service
      .changeAccountPermission({ permissions: AccessLevel.ADMIN, username: '' })
      .subscribe((data) => {
        expect(data.result).toEqual({
          __typename: 'User',
          email: '',
          firstName: undefined,
          lastName: undefined,
          permissions: AccessLevel.ADMIN,
          username: '',
        });
        done();
      });
  });

  it('changeAccountPermission should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service
      .changeAccountPermission({ permissions: AccessLevel.ADMIN, username: '' })
      .subscribe((data) => {
        expect(data.error).toEqual('example');
        done();
      });
  });

  //setThemeData
  it('setThemeData should return a void object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: {} });
      })
    );
    service.setThemeData({ expectedVersion: 1 }).subscribe((data) => {
      expect(data.result).toEqual({});
      done();
    });
  });

  it('setThemeData should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.setThemeData({ expectedVersion: 1 }).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //getUrlResource
  it('getUrlResource should return a string when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getResourceUploadURLQuery });
      })
    );
    service.getUrlResource().subscribe((data) => {
      expect(data.result).toEqual('example');
      done();
    });
  });

  it('getUrlResource should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.getUrlResource().subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //getImg
  it('getImg should return a ResourceConnection object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _getSiteResourcesQuery });
      })
    );
    service.getImg({ type: AssetType.LOGO }).subscribe((data) => {
      expect(data.result).toEqual({
        __typename: 'ResourceConnection',
        items: [],
        token: undefined,
      });
      done();
    });
  });

  it('getImg should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.getImg({ type: AssetType.LOGO }).subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });

  //setImg
  it('setImg should return a ResourceConnection object when the promise it succesful resolve', (done) => {
    spyOn(service, 'getImg').and.returnValue(
      of({
        result: {
          __typename: 'ResourceConnection',
          items: [],
          token: undefined,
        },
      })
    );
    service.setImg({ img: new ArrayBuffer(1), url: '' }).subscribe((data) => {
      expect(data.result).toEqual(true);
      done();
    });
  });

  //getThemeData
  it('getThemeData should return a SiteConfiguration object when the promise it succesful resolve', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        resolve({ data: _siteConfigurationQuery });
      })
    );
    service.getThemeData().subscribe((data) => {
      expect(data.result).toEqual({
        __typename: 'SiteConfiguration',
        buttonColor: undefined,
        headerColor: undefined,
        highlightColor: undefined,
        logoImage: undefined,
        version: 0,
      });
      done();
    });
  });

  it('getThemeData should return a error message when the promise it rejected', (done) => {
    API.graphql = jasmine.createSpy().and.returnValue(
      new Promise((resolve, reject) => {
        reject({ errors: [{ message: 'example' }] });
      })
    );

    service.getThemeData().subscribe((data) => {
      expect(data.error).toEqual('example');
      done();
    });
  });
});

class HttpClientTestingModule {
  put(): Observable<any> {
    return of(true);
  }
}

const _siteConfigurationQuery: SiteConfigurationQuery = {
  siteConfiguration: {
    __typename: 'SiteConfiguration',
    buttonColor: undefined,
    headerColor: undefined,
    highlightColor: undefined,
    logoImage: undefined,
    version: 0,
  },
};

const _getSiteResourcesQuery: GetSiteResourcesQuery = {
  getSiteResources: {
    __typename: 'ResourceConnection',
    items: [],
    token: undefined,
  },
};
const _getResourceUploadURLQuery: GetResourceUploadURLQuery = {
  getResourceUploadURL: 'example',
};
const _updateUserAccessMutation: UpdateUserAccessMutation = {
  updateUserAccess: {
    __typename: 'User',
    email: '',
    firstName: undefined,
    lastName: undefined,
    permissions: AccessLevel.ADMIN,
    username: '',
  },
};
const _user: CreateStaffUserMutation = {
  createStaffUser: {
    __typename: 'User',
    email: '',
    firstName: undefined,
    lastName: undefined,
    permissions: AccessLevel.ADMIN,
    username: '',
  },
};
const _getUsersQuery: GetUsersQuery = {
  getUsers: {
    __typename: 'UserConnection',
    items: [],
    token: undefined,
  },
};
