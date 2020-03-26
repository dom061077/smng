import { TestBed, inject} from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticationService',()=>{
    let authService : AuthenticationService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthenticationService]
        });

        authService = TestBed.get(AuthenticationService);
    });

    it('Debería devolver el token de authenticación via POST',()=>{
        /*const dummyPost = [{
             "username": "acostaa", "password": '12345' 
        }];*/
        authService.login("acostaa","12345");
    });



});

