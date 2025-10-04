'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Package, 
  Shield, 
  FolderOpen,
  Plus,
  BookOpen,
  User,
  LogOut
} from 'lucide-react'
import { useSession, signOut } from '@/lib/auth-client'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Submit', href: '/submit', icon: Plus },
  { name: 'Programs', href: '/programs', icon: FolderOpen },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ImpactLedger</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link href="/programs/new">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New Program</span>
                  </Button>
                </Link>
                
                <Link href="/docs">
                  <Button size="sm" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Docs</span>
                  </Button>
                </Link>

                {/* User info */}
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs">{session.user.role}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {session.user.name || session.user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/docs">
                  <Button size="sm" className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Docs</span>
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}

            {/* Offline indicator */}
            <OfflineIndicator />
          </div>
        </div>
      </div>
    </nav>
  )
}

function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <Badge variant="destructive" className="animate-pulse">
      Offline
    </Badge>
  )
}

// Add missing imports
import { useState, useEffect } from 'react'
