import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary">Page Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-[500px]">
                We couldn&apos;t find the page you were looking for. It might have been removed, renamed, or doesn&apos;t exist.
            </p>
            <Button asChild size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
