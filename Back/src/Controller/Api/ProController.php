<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ProController extends AbstractController
{
    /**
     * @Route("/api/pro", name="api_pro_show")
     * @IsGranted("ROLE_PRO")
     */
    public function show(User $user = null): Response
    {
        $user = $this->getUser();

        if ($user === null) {
            return new JsonResponse(
                ["message" => "User non trouvée !"],
                Response::HTTP_NOT_FOUND
            );
        }

        if ($user->getRoles() == ["ROLE_PRO"]) {
            // /!\ JSON Hijacking
            return $this->json($user, Response::HTTP_OK, [], ['groups' => 'pro_get_by_id']);
        }


        return new JsonResponse(["message" => "Pro non trouvée !"], Response::HTTP_NOT_FOUND);
    }

    /**
     * @Route("/api/pro/edit", name="api_pro_edit", methods={"PUT"})
     * @IsGranted("ROLE_PRO")
     */
    public function itemEdit(User $user = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request, UserPasswordHasherInterface $hasher): Response
    {
        $user = $this->getUser();
        // User non trouvé
        if ($user === null) {
            return new JsonResponse(
                ["message" => "User non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }

        $data = $request->getContent();

        // Condition si il l'utilisateur modifie sont mot de passe ou non !
        $array = json_decode($data, true);

        if (array_key_exists('password', $array)) {
            $data = json_encode($array);

            $user = $serializer->deserialize($data, User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

            // On valide l'entité
            $errors = $validator->validate($user);

            $user->setPassword($hasher->hashPassword($user, $user->getPassword()));

            // Affichage des erreurs
            if (count($errors) > 0) {
                $newErrors = [];

                foreach ($errors as $error) {
                    $newErrors[$error->getPropertyPath()][] = $error->getMessage();
                }

                return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // Enregistrement en BDD
            $entityManager->flush();

            return new JsonResponse(["message" => "User modifié"], Response::HTTP_OK);
        } else {
            $user = $serializer->deserialize($data, User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

            // On valide l'entité
            $errors = $validator->validate($user);

            // Affichage des erreurs
            if (count($errors) > 0) {
                $newErrors = [];

                foreach ($errors as $error) {
                    $newErrors[$error->getPropertyPath()][] = $error->getMessage();
                }

                return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // Enregistrement en BDD
            $entityManager->flush();

            return new JsonResponse(["message" => "User modifié"], Response::HTTP_OK);
        }
    }
}