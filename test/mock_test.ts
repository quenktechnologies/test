import { Mock } from '../src/mock';

class Actor extends Mock {

    tell<A>(path: string, value: A): Actor {

        return this.MOCK.record('tell', [value], this);

    }

    spawn(tmpl: object): string {

        return this.MOCK.record('spawn', [tmpl], '?');

    }

    kill(addr: string): void {

        return this.MOCK.record('kill', [addr], undefined);

    }

}

describe('mock', () => {

    describe('Mock', () => {

        describe('record', () => {

          it('should record method applications', () => {

            let a = new Actor();

            if(a.MOCK.calls.length > 0) {

              throw new Error('Invalid state');

            }

            a.spawn({});

            if(a.MOCK.calls.length !== 1)
              throw new Error('Calls length must be 1!');
              
            });
          
        });

        describe('called', () => {

            it('should provided the order methods were called', () => {

              let a = new Actor();

              a .tell('?', 'foo');
               a .spawn({});
a                .kill('?');

              let ret = a.MOCK.called().join(',');

              if(ret !== 'tell,spawn,kill') {

                throw new Error(`Incorrect call sequence "${ret}"`);

              }
              
            });
          
        });
      
    });

});
