"use client"

import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Coins, Loader2, Package, ShoppingBag, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-context"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { api } from "@/lib/api"
import { fill } from "@/lib/format"
import type { StoreProduct } from "@/lib/types"

type Category = "all" | "electronics" | "home" | "outdoor" | "accessories"

/** Price actually charged, mirroring the server's calculation. */
function finalPrice(product: StoreProduct) {
  return product.discount
    ? Math.floor(product.price * (1 - product.discount / 100))
    : product.price
}

export default function StorePage() {
  const { t } = useLanguage()
  const { user, setUser } = useAuth()

  const [products, setProducts] = useState<StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [confirming, setConfirming] = useState<StoreProduct | null>(null)
  const [buyingId, setBuyingId] = useState<string | null>(null)

  const userCoins = user?.ecoPoints ?? 0

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setProducts(await api.store.products())
    } catch (err) {
      setError(err instanceof Error ? err.message : t.store.loadError)
    } finally {
      setLoading(false)
    }
  }, [t.store.loadError])

  useEffect(() => {
    load()
  }, [load])

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const categories: { id: Category; label: string; icon: typeof Package }[] = [
    { id: "all", label: t.store.allProducts, icon: Package },
    { id: "electronics", label: t.store.electronics, icon: Zap },
    { id: "home", label: t.store.home, icon: ShoppingBag },
    { id: "outdoor", label: t.store.outdoor, icon: Package },
    { id: "accessories", label: t.store.accessories, icon: ShoppingBag },
  ]

  const handleBuy = async (product: StoreProduct) => {
    setConfirming(null)
    setBuyingId(product.id)
    try {
      const result = await api.store.buy(product.id)
      // The API returns both the updated product and the updated user, so the
      // balance and the stock counter refresh without a second round trip.
      setProducts((prev) => prev.map((p) => (p.id === product.id ? result.product : p)))
      setUser(result.user)

      toast.success(fill(t.store.purchased, { name: product.name }), {
        description: `-${result.pricePaid} ${t.store.coins}`,
      })
      result.newAchievements.forEach((achievement) => {
        toast.success(fill(t.achievements.newBadge, { title: achievement.title }), {
          description: fill(t.achievements.reward, { points: achievement.rewardPoints }),
          duration: 6000,
        })
      })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.store.loadError)
      load() // our stock view may be stale
    } finally {
      setBuyingId(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <section className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            {t.store.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">{t.store.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            {t.store.description}
          </p>

          {/* Balance, live from the authenticated session. */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-primary/10 border-2 border-primary/20 rounded-full px-6 py-3"
          >
            <Coins className="h-6 w-6 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{t.store.yourBalance}</p>
              {user ? (
                <p className="text-xl font-bold text-primary">
                  {userCoins.toLocaleString()} {t.store.coins}
                </p>
              ) : (
                <Link href="/login" className="text-xl font-bold text-primary hover:underline">
                  {t.common.signIn}
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="h-full overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardContent className="space-y-3 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-20" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-16 text-center">
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={load}>
              {t.common.retry}
            </Button>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">{t.store.noProducts}</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => {
              const price = finalPrice(product)
              const affordable = userCoins >= price
              const isBuying = buyingId === product.id

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow group">
                    <CardHeader className="p-0 relative">
                      <div className="relative w-full h-48 bg-muted">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {product.discount ? (
                        <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                          {product.discount}% {t.store.off}
                        </Badge>
                      ) : null}
                      {!product.inStock && (
                        <Badge className="absolute top-2 left-2 bg-muted text-muted-foreground">
                          {t.store.outOfStock}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1 p-4 space-y-2">
                      <h3 className="font-semibold text-lg text-balance">{product.name}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Coins className="h-5 w-5 text-primary" />
                        <span className="text-xl font-bold text-primary">{price}</span>
                        {product.discount ? (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.price}
                          </span>
                        ) : null}
                        {product.inStock && product.stock <= 10 && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {product.stock} {t.store.left}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      {!user ? (
                        <Button asChild className="w-full" variant="outline">
                          <Link href="/login">{t.store.signInToBuy}</Link>
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          disabled={!product.inStock || !affordable || isBuying}
                          variant={!affordable ? "outline" : "default"}
                          onClick={() => setConfirming(product)}
                        >
                          {isBuying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isBuying
                            ? t.store.buying
                            : !product.inStock
                              ? t.store.outOfStock
                              : !affordable
                                ? t.store.notEnoughCoins
                                : t.store.buyNow}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </section>

      <AlertDialog open={confirming !== null} onOpenChange={(open) => !open && setConfirming(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.store.confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirming?.name}
              {" — "}
              {fill(t.store.confirmBody, { price: confirming ? finalPrice(confirming) : 0 })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirming && handleBuy(confirming)}>
              {t.store.confirmBuy}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  )
}
