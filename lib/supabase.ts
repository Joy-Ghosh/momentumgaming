import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        'Missing Supabase environment variables. Please check your .env.local file and restart the development server.'
    );
}

// Create client regardless, but with empty strings if missing (it might fail on calls, but won't crash import)
// Or better yet, we can export a proxy that checks before calling.
// But for now, let's just create it. If URL is empty, createClient might throw or just fail gently later.
// Actually createClient throws if URL is missing. Let's wrap it.

export const supabase = (() => {
    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a dummy object that logs errors on method calls to prevent crash
        return {
            from: () => ({
                select: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
                insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
                // Add other methods as needed or just use a Proxy if we want perfect mocking
            }),
            auth: {
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                signInWithPassword: () => Promise.resolve({ data: { session: null }, error: { message: 'Supabase not configured' } }),
                signOut: () => Promise.resolve({ error: null }),
            }
        } as any;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
})();
