<?php

namespace App\Repository;

use App\Entity\Alarme;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Alarme|null find($id, $lockMode = null, $lockVersion = null)
 * @method Alarme|null findOneBy(array $criteria, array $orderBy = null)
 * @method Alarme[]    findAll()
 * @method Alarme[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlarmeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Alarme::class);
    }

     public function findByiComprime($id)
    {
        return  $this->createQueryBuilder('a')
        // p.category refers to the "category" property on product
        ->innerJoin('a.compr', 'c')       
        ->addSelect('a')
        ->andWhere('c.id = :id')
        ->setParameter('id', $id)
        ->getQuery()
        ->getOneOrNullResult();
    }

    /*
    public function findOneBySomeField($value): ?Alarme
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
