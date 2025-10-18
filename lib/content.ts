import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// İçerik dizinlerinin yolları
const contentDirectory = path.join(process.cwd(), 'content')
const pagesDirectory = path.join(contentDirectory, 'pages')
const menuDirectory = path.join(contentDirectory, 'menu')
const announcementsDirectory = path.join(contentDirectory, 'announcements')

// Genel tip tanımları
export interface ContentItem {
  slug: string
  data: any
  content: string
}

export interface MenuItem {
  slug: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  calories?: number
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  isActive: boolean
  content: string
}

export interface PageContent {
  slug: string
  data: any
  content: string
}

export interface Announcement {
  slug: string
  title: string
  content: string
  date: string
  isActive: boolean
  priority: 'düşük' | 'orta' | 'yüksek'
}

/**
 * Belirtilen dizindeki tüm markdown dosyalarını okur
 */
function getContentFromDirectory(directory: string): ContentItem[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  const fileNames = fs.readdirSync(directory)
  const allContent = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        data,
        content,
      }
    })

  return allContent
}

/**
 * Belirtilen dosyayı okur
 */
function getContentFile(directory: string, slug: string): ContentItem | null {
  try {
    const fullPath = path.join(directory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      data,
      content,
    }
  } catch {
    return null
  }
}

// Menü fonksiyonları
export function getAllMenuItems(): MenuItem[] {
  const items = getContentFromDirectory(menuDirectory)
  return items
    .map(item => ({
      slug: item.slug,
      name: item.data.name || '',
      description: item.data.description || '',
      price: item.data.price || 0,
      category: item.data.category || '',
      image: item.data.image,
      calories: item.data.calories,
      isVegetarian: item.data.isVegetarian || false,
      isVegan: item.data.isVegan || false,
      isGlutenFree: item.data.isGlutenFree || false,
      isActive: item.data.isActive !== false, // default true
      content: item.content,
    }))
    .filter(item => item.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
}

export function getMenuItemBySlug(slug: string): MenuItem | null {
  const item = getContentFile(menuDirectory, slug)
  if (!item) return null

  return {
    slug: item.slug,
    name: item.data.name || '',
    description: item.data.description || '',
    price: item.data.price || 0,
    category: item.data.category || '',
    image: item.data.image,
    calories: item.data.calories,
    isVegetarian: item.data.isVegetarian || false,
    isVegan: item.data.isVegan || false,
    isGlutenFree: item.data.isGlutenFree || false,
    isActive: item.data.isActive !== false,
    content: item.content,
  }
}

export function getMenuItemsByCategory(category: string): MenuItem[] {
  const allItems = getAllMenuItems()
  return allItems.filter(item => item.category === category)
}

export function getMenuCategories(): string[] {
  const allItems = getAllMenuItems()
  const categories = [...new Set(allItems.map(item => item.category))]
  return categories.sort((a, b) => a.localeCompare(b, 'tr'))
}

// Sayfa fonksiyonları
export function getPageContent(slug: string): PageContent | null {
  const item = getContentFile(pagesDirectory, slug)
  if (!item) return null

  return {
    slug: item.slug,
    data: item.data,
    content: item.content,
  }
}

export function getAllPages(): PageContent[] {
  const items = getContentFromDirectory(pagesDirectory)
  return items.map(item => ({
    slug: item.slug,
    data: item.data,
    content: item.content,
  }))
}

// Duyuru fonksiyonları
export function getAllAnnouncements(): Announcement[] {
  const items = getContentFromDirectory(announcementsDirectory)
  return items
    .map(item => ({
      slug: item.slug,
      title: item.data.title || '',
      content: item.content,
      date: item.data.date || '',
      isActive: item.data.isActive !== false,
      priority: item.data.priority || 'orta',
    }))
    .filter(item => item.isActive)
    .sort((a, b) => {
      // Önce önceliğe göre sırala
      const priorityOrder: Record<string, number> = { 'yüksek': 3, 'orta': 2, 'düşük': 1 }
      const priorityDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
      if (priorityDiff !== 0) return priorityDiff
      
      // Sonra tarihe göre (yeniden eskiye)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export function getAnnouncementBySlug(slug: string): Announcement | null {
  const item = getContentFile(announcementsDirectory, slug)
  if (!item) return null

  return {
    slug: item.slug,
    title: item.data.title || '',
    content: item.content,
    date: item.data.date || '',
    isActive: item.data.isActive !== false,
    priority: item.data.priority || 'orta',
  }
}

// Arama fonksiyonu
export function searchContent(query: string): ContentItem[] {
  const allMenuItems = getContentFromDirectory(menuDirectory)
  const allPages = getContentFromDirectory(pagesDirectory)
  const allAnnouncements = getContentFromDirectory(announcementsDirectory)
  
  const allContent = [...allMenuItems, ...allPages, ...allAnnouncements]
  
  const searchQuery = query.toLowerCase()
  
  return allContent.filter(item => {
    const titleMatch = (item.data.title || item.data.name || '').toLowerCase().includes(searchQuery)
    const descriptionMatch = (item.data.description || '').toLowerCase().includes(searchQuery)
    const contentMatch = item.content.toLowerCase().includes(searchQuery)
    
    return titleMatch || descriptionMatch || contentMatch
  })
}

// Yardımcı fonksiyonlar
export function formatPrice(price: number): string {
  return `${price} ₺`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}