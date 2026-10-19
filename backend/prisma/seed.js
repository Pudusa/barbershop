"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.appointment.deleteMany();
    await prisma.barber.deleteMany();
    await prisma.service.deleteMany();
    await prisma.product.deleteMany();
    console.log('Seeding database...');
    const services = await Promise.all([
        prisma.service.create({
            data: {
                name: 'Classic Haircut',
                description: 'Traditional haircut with hot lather neck shave and style.',
                price: 35,
                durationMinutes: 30,
                category: 'Hair',
                image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
            },
        }),
        prisma.service.create({
            data: {
                name: 'Beard Trim & Shape',
                description: 'Precision beard sculpting, hot towel, and conditioning balm.',
                price: 25,
                durationMinutes: 20,
                category: 'Beard',
                image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
            },
        }),
        prisma.service.create({
            data: {
                name: 'Royal Shave',
                description: 'Straight razor hot towel shave with facial massage.',
                price: 40,
                durationMinutes: 45,
                category: 'Shave',
                image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
            },
        }),
        prisma.service.create({
            data: {
                name: 'The Full Treatment',
                description: 'Haircut, beard trim, royal shave, and facial treatment.',
                price: 85,
                durationMinutes: 75,
                category: 'Combos',
                image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800',
            },
        }),
    ]);
    const barbers = await Promise.all([
        prisma.barber.create({
            data: {
                name: 'Alex "The Blade" Rivera',
                role: 'Master Barber',
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
                bio: 'Over 12 years of experience specializing in classic cuts and razor fades.',
                specialties: ['Fade', 'Beard Sculpting', 'Hot Towel Shave'],
            },
        }),
        prisma.barber.create({
            data: {
                name: 'Marcus Vance',
                role: 'Senior Stylist',
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
                bio: 'Expert in modern texture crops, scissor work, and contemporary styling.',
                specialties: ['Crop', 'Scissor Cut', 'Styling'],
            },
        }),
        prisma.barber.create({
            data: {
                name: 'David "Fade" Miller',
                role: 'Barber & Colorist',
                rating: 4.9,
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
                bio: 'Passionate about sharp fades, hair designs, and beard grooming.',
                specialties: ['Burst Fade', 'Line Up', 'Beard Trim'],
            },
        }),
    ]);
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Matte Clay Pomade',
                description: 'Strong hold with a natural matte finish. Easy to wash out.',
                price: 22.0,
                category: 'Styling',
                image: 'https://images.unsplash.com/photo-1583209814638-b7a44a1e9dc8?auto=format&fit=crop&q=80&w=800',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Premium Beard Oil',
                description: 'Nourishing organic oils with cedarwood and argan scent.',
                price: 18.5,
                category: 'Beard',
                image: 'https://images.unsplash.com/photo-1608248597359-994b5952f26d?auto=format&fit=crop&q=80&w=800',
            },
        }),
        prisma.product.create({
            data: {
                name: 'Refreshing Aftershave Balm',
                description: 'Soothes and hydrates skin post-shave with aloe and tea tree.',
                price: 20.0,
                category: 'Skincare',
                image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
            },
        }),
    ]);
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map