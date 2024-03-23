import { Injectable } from "@angular/core";
import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  createClient,
} from "@supabase/supabase-js";
import { Observable, Subject, from, map, merge } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private supabase: SupabaseClient;
  private authChanges$: Subject<Session | null> = new Subject();
  session$: Observable<Session | null>;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.session$ = merge(
      from(this.supabase.auth.getSession()).pipe(
        map((res) => res.data.session)
      ),
      this.authChanges$.asObservable(),
    );
  }

  private authChangeCallback = (_: AuthChangeEvent, session: Session | null) =>
    this.authChanges$.next(session);

  listenAuthChanges() {
    this.supabase.auth.onAuthStateChange(this.authChangeCallback);
  }

  signIn(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
