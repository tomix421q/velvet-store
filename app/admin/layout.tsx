import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ReactNode } from 'react'

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  try {
    console.log('1. Začínam AdminLayout')

    const { getUser } = getKindeServerSession()
    console.log('2. getKindeServerSession OK')

    const user = await getUser()

    // Tu pridáme debug komponentu ktorá zobrazí dáta
    return (
      <div>
        <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
          <h3>Debug Info:</h3>
          <pre>
            {JSON.stringify(
              {
                userExists: !!user,
                userEmail: user?.email,
                userData: user,
              },
              null,
              2
            )}
          </pre>
        </div>

        {/* Ak chcete vidieť pôvodný layout, nechajte tu podmienku */}
        {!user || user.email !== 'zilka.tomas421@gmail.com' ? (
          <div>Unauthorized - redirecting...</div>
        ) : (
          // Váš pôvodný layout kód
          <div className='flex w-full flex-col max-w-7xl mx-auto '>{/* ... zvyšok vášho kódu ... */}</div>
        )}
      </div>
    )
  } catch (error: any) {
    // Zobrazíme error info namiesto redirectu
    return (
      <div style={{ padding: '20px', background: '#fee', margin: '20px' }}>
        <h3>Error occurred:</h3>
        <pre>
          {JSON.stringify(
            {
              error: error.message,
              stack: error.stack,
            },
            null,
            2
          )}
        </pre>
      </div>
    )
  }
}
