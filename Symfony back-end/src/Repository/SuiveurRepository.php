<?php

namespace App\Repository;

use App\Entity\Suiveur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Suiveur|null find($id, $lockMode = null, $lockVersion = null)
 * @method Suiveur|null findOneBy(array $criteria, array $orderBy = null)
 * @method Suiveur[]    findAll()
 * @method Suiveur[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SuiveurRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Suiveur::class);
    }
     public function findByIdSuiveur($id)
    {
        return $this->createQueryBuilder('s')
                ->Join("s.medicaments","m")
                ->addSelect('m')
            ->andWhere('s.id = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?Suiveur
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
